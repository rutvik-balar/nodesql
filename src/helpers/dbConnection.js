const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    database: "user",
    port: 3305
};

const connection = mysql.createPool(dbConfig);

module.exports = connection;