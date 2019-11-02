var credential = require('../credential');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: credential.host,
  user: credential.user,
  password: credential.password,
  database: credential.database
});

connection.connect(function(err) {
  // employee tables
  var employeeTable = "CREATE TABLE employee"
    + " (id INT AUTO_INCREMENT NOT NULL,"
    + " role TINYINT,"
    + " name VARCHAR(100),"
    + " email VARCHAR(100) NOT NULL,"
    + " image_path TEXT,"
    + " designation VARCHAR(100),"
    + " position VARCHAR(100),"
    + " employee_number VARCHAR(100),"
    + " date_hired DATE,"
    + " PRIMARY KEY (id))";

  connection.query(employeeTable, function (err) {
    if (err) { throw err }
    console.log("employee table created");
  });
  var insertEmployeesQuery = "INSERT INTO employee "
    + "(role, name, email, image_path, designation, position, employee_number, date_hired) VALUES "
    + "(2,'Jacky Chan', 'jacky.chan@email.com', 'https://cdn4.iconfinder.com/data/icons/people-avatar-1-2/512/7-512.png', 'Sales', 'Crew', 'EMP-123', '2019-09-19'),"
    + "(2,'Johny Depp', 'johny.depp@email.com', 'https://cdn4.iconfinder.com/data/icons/people-avatar-2-2/512/98-512.png', 'Production', 'Clerk', 'EMP-234', '2019-06-11'),"
    + "(1,'Admin User', 'an.admin@email.com', 'https://cdn1.iconfinder.com/data/icons/hipster-4/512/hipster-fashion-style-beard-man-glasses-512.png', 'IT Service', 'Supervisor', 'EMP-003', '2001-11-26'),"
    + "(2,'John Doe', 'john.doe@sample.com', 'https://cdn4.iconfinder.com/data/icons/men-avatars-icons-set-2/256/4-512.png', 'Operations', 'Manager', 'EMP-345', '2001-03-03')";

  connection.query(insertEmployeesQuery, function (err) {
    if (err) { throw err; }
    console.log("4 records inserted");
  });

  // performance review table
  var performance_review = "CREATE TABLE performance_review "
    + "(id INT NOT NULL AUTO_INCREMENT, "
    + "reviewer_id INT NOT NULL, "
    + "employee_id INT NOT NULL, "
    + "factor_id INT NOT NULL, "
    + "rating TINYINT NOT NULL, "
    + "review_date DATE NOT NULL, "
    + "PRIMARY KEY (id))";

  connection.query(performance_review, function (err) {
    if (err) { throw err; }
    console.log("performance_review table created");
  });

  var inserReviewQuery = "INSERT INTO performance_review (reviewer_id, employee_id, factor_id, rating, review_date) VALUES ?";
  var inserReviewvalues = [
    [4, 1, 1, 5, "2019-01-01"],
    [4, 1, 2, 4, "2019-01-01"],
    [4, 1, 3, 3, "2019-01-01"],
    [4, 1, 4, 3, "2019-01-01"],
    [4, 1, 5, 3, "2019-01-01"],
    [4, 1, 6, 2, "2019-01-01"],
    [4, 1, 7, 4, "2019-01-01"],
    [4, 1, 8, 2, "2019-01-01"],
    [1, 2, 1, 5, "2019-01-01"],
    [1, 2, 2, 4, "2019-01-01"],
    [1, 2, 3, 3, "2019-01-01"],
    [1, 2, 4, 3, "2019-01-01"],
    [1, 2, 5, 1, "2019-01-01"],
    [1, 2, 6, 2, "2019-01-01"],
    [1, 2, 7, 5, "2019-01-01"],
    [1, 2, 8, 2, "2019-01-01"],
    [2, 1, 1, 1, "2019-01-01"],
    [2, 1, 2, 4, "2019-01-01"],
    [2, 1, 3, 4, "2019-01-01"],
    [2, 1, 4, 3, "2019-01-01"],
    [2, 1, 5, 1, "2019-01-01"],
    [2, 1, 6, 2, "2019-01-01"],
    [2, 1, 7, 5, "2019-01-01"],
    [2, 1, 8, 2, "2019-01-01"],
  ];
  connection.query(inserReviewQuery, [inserReviewvalues], function (err, result) {
    if (err) { throw err; }
    console.log("24 number of records inserted: " + result.affectedRows);
  });

  // review factor
  var review_factor = "CREATE TABLE review_factor (id TINYINT NOT NULL AUTO_INCREMENT, name VARCHAR(100), description VARCHAR(100), PRIMARY KEY (id))";
  connection.query(review_factor, function (err) {
    if (err) { throw err; }
    console.log("review_factor table created");
  });

  var insertFactorQuery = "INSERT INTO review_factor (name, description) VALUES ?";
  var insertFactor = [
    ["Adaptability", "Works under stress or pressure and responds to change."],
    ["Attendance", "Can be depended upon to be available for work and to fulfill position responsibilities."],
    ["Communication", "Effectively listening, conveys and receives ideas, information and direction."],
    ["Creativity", "Generates workable and innovative ideas, concepts and techniques."],
    ["Initiative", "Independently performs and accomplishes assignments."],
    ["Planning & Organizing", "Plans, organizes and implements tasks."],
    ["Problem Solving & Decision Making", "Demonstrates ability to clearly isolate, define and seek solutions to problem areas."],
    ["Productivity", "Produces the expected quality and quantity of assignments."]
  ];

  connection.query(insertFactorQuery, [insertFactor], function (err, result) {
    if (err) { throw err; }
    console.log("8 number of records inserted: " + result.affectedRows);
  });

  connection.end();
});



