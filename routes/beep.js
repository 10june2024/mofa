const express = require ('express');
const router = express.Router();
const db = require('../db');
const bodyParser = require('body-parser');


router.get('/', (req, res) => {
const query = 'SELECT notify FROM newtable WHERE notify=0';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the query: ' + err.stack);
      return res.status(500).send('Error fetching data from the database.');
    }

    const rowCount = results.length;
    
 
    
 // Store the data in a variable
    const data = Object.values(JSON.parse(JSON.stringify(results)));
    
      

    if (rowCount > 0) {
        // Send a JSON response indicating that audio should be played
        res.json({ playAudio: true });
    } else {
        res.json({ message: 'No' });
    }
   
  
    
  });
});


module.exports =router
