var mysql = require('mysql');
var credential = require('./credential');

var connectionPool = mysql.createPool({
  host: credential.host,
  user: credential.user,
  password: credential.password,
  database: credential.database,
  multipleStatements: true
});

module.exports = connectionPool;
