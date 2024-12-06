const mysql = require('mysql');
require('dotenv').config();


// MySQL database configuration
const dbu = mysql.createConnection({

      host: process.env.DB_HOST,
      user: process.env.DB_USER1,
      password: process.env.DB_PASSWORD1,
      database: process.env.DB_DATABASE1,
      PORT: process.env.DB_PORT

  });

  

// Connect to the database
dbu.connect((err) => {
  if (err) {
    console.error('Error connecting to UserDB:', err);
    throw err;
  }
  console.log('Connected to UserDb');
});




module.exports = dbu;
