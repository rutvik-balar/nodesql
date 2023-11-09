const mysql = require('mysql2');
const env = require('dotenv').config();

const dbConfig = {
    host: process.env.HOST,
    user: 'root',
    database: process.env.DATABASE,
    port: process.env.DB_PORT
};

const connection = mysql.createPool(dbConfig);

module.exports = connection;