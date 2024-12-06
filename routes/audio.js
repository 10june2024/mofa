const express = require ('express');
const router = express.Router();
router.use(express.static('public'));




router.get('/', (req, res) => {

    const htmlContent = `
        <!doctype html>
        <html lang="en">
        <head>
            
            <script src="/script/jquery.js"></script>

            <!-- Your JavaScript code -->
            <script>
                $(document).ready(function() {
                    $.get('/beep', function(data) {
                        if (data.playAudio) {
                            const audio = new Audio('beep/beep.mp3');
                            audio.play();
                        } else {
                            console.log('No audio to play.');
                        }
                    });
                });
            </script>
       
            <!-- Required meta tags -->
            <meta http-equiv="refresh" content="2">
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Audio Page</title>
        </head>
        <body>
            Audio Page
        </body>
        </html>
    `;

    // Send the HTML content as a response
    res.send(htmlContent);

            
});

module.exports =router
