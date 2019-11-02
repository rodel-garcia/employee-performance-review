var credential = require('../credential');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: credential.host,
  user: credential.user,
  password: credential.password
});

connection.connect(function(err) {
  if (err) { throw err; };
  console.log("Connected!");

  // create database;
  connection.query("CREATE DATABASE " + credential.database, function (err) {
    if (err) { throw err };
    console.log(credential.database, "created");
    connection.end();
  });
});
