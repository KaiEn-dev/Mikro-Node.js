const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: process.env.CONNECTION_LIMIT,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DB,
  host: process.env.DB_HOST,
});

module.exports = pool;
