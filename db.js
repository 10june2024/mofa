const mysql = require('mysql');
require('dotenv').config();

// MySQL database configuration
const db = mysql.createConnection({
 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    PORT: process.env.DB_PORT

});


  
  

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});


//create table

const createTableSQL = `
CREATE TABLE IF NOT EXISTS newtable (
              id INT AUTO_INCREMENT PRIMARY KEY,
              username VARCHAR(255),
              password VARCHAR(255),
              ip VARCHAR(255) NOT NULL,
              useragent VARCHAR(255) NOT NULL,
              date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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


module.exports = db;
