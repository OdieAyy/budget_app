const mysql = require('mysql2')

const conf = mysql.createConnection({
  host     : 'localhost',
  connectionLimit: 10,
  user     : 'adrian',
  password : 'jewels-4202',
  database : 'budget_app'
});

module.exports = conf
