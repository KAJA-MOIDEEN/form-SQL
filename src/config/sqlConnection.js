const mysql = require('mysql2');

const sqlConnection = mysql.createConnection({
    host: 'localhost',      // Replace with your database host
    user: 'root',           // Replace with your database username
    password: 'root',   // Replace with your database password
    database: 'CodeByKaja'      // Replace with your database name
});

sqlConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

module.exports = { sqlConnection };
