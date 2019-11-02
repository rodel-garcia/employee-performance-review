var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var connectionPool = require('../database/connection');

router.get('/', function(req, res) {
  connectionPool.getConnection(function(err, connection) {
    if (err) { throw err; }
    connection.query("SELECT * FROM employee WHERE role != 1", function (err, result) {
      if (err) { throw err; }
      connection.release();
      res.send(result);
    });
  });
});

router.post('/add', function(req, res) {
  connectionPool.getConnection(function(err, connection) {
    if (err) { throw err; }
    const body = req.body
    var query = "INSERT INTO employee (role, name, email, image_path, designation, position, employee_number, date_hired) "
      + "VALUES (" + 2 + ", '" + body.name + "', '" + body.email + "', '" + body.image_path + "', '"
      + body.designation + "', '" + body.position + "', '" + body.employee_number + "', '" + body.date_hired + "')";

    connection.query(query, function (err, result) {
      if (err) { throw err; }
      connection.release();
      res.send(result);
    });
  });
});

router.get('/review/factors', function(req, res) {
  connectionPool.getConnection(function(err, connection) {
    if (err) { throw err; }
    var query = "SELECT * FROM review_factor";
    connection.query(query, function (err, result) {
      if (err) { throw err; }
      connection.release();
      res.send(result);
    });
  });
});

router.get('/:id', function(req, res) {
  connectionPool.getConnection(function(err, connection) {
    if (err) { throw err; }
    var query = "SELECT * FROM employee WHERE id=" + req.params.id;
    connection.query(query, function (err, result) {
      if (err) { throw err; }
      if (!result.length) { res.send(null); return; }
      connection.release();
      res.send(result[0]);
    });
  });
});

router.put('/:id', function(req, res) {
  connectionPool.getConnection(function(err, connection) {
    if (err) { throw err; }
    const body = req.body
    var query = "UPDATE employee SET "
      + "name='" + body.name + "', "
      + "email='" + body.email + "', "
      + "image_path='" + body.image_path + "', "
      + "designation='" + body.designation + "', "
      + "position='" + body.position + "', "
      + "employee_number='" + body.employee_number + "', "
      + "date_hired='" + body.date_hired + "' "
      + "WHERE id=" + req.params.id;

    connection.query(query, function (err, result) {
      if (err) { throw err; }
      connection.release();
      res.send(result);
    });
  });
});

router.delete('/:id', function(req, res) {
  connectionPool.getConnection(function(err, connection) {
    if (err) { throw err; }
    var query = "DELETE FROM employee WHERE id=" + req.params.id;
    connection.query(query, function (err, result) {
      if (err) { throw err; }
      connection.release();
      res.send(result);
    });
  });
});

router.get('/:id/reviews', function(req, res) {
  connectionPool.getConnection(function(err, connection) {
    if (err) { throw err; }
    var query = "SELECT pr.reviewer_id, pr.review_date, AVG(pr.rating) as total_rating, "
      + "(SELECT name FROM mydb.employee WHERE id=pr.reviewer_id) as reviewer "
      + "FROM myDB.performance_review pr "
      + "LEFT JOIN mydb.employee e ON e.id = pr.employee_id "
      + "WHERE pr.employee_id = "+ req.params.id
      + " GROUP BY pr.reviewer_id";
    connection.query(query, function (err, result) {
      if (err) { throw err; }
      connection.release();
      res.send(result);
    });
  });
});

router.get('/:id/reviews/:reviewer_id', function(req, res) {
  connectionPool.getConnection(function(err, connection) {
    if (err) { throw err; }
    var query = "SELECT pr.reviewer_id, pr.id, rf.name, rf.description, pr.rating, pr.review_date, "
      + "(SELECT name FROM employee WHERE id=pr.reviewer_id) as reviewer "
      + "FROM performance_review pr "
      + "LEFT JOIN employee e ON e.id = pr.employee_id "
      + "LEFT JOIN review_factor rf ON pr.factor_id = rf.id "
      + "WHERE pr.employee_id = " + req.params.id + " "
      + "AND pr.reviewer_id = " + req.params.reviewer_id;

    connection.query(query, function (err, result) {
      if (err) { throw err; }
      connection.release();
      res.send(result);
    });
  });
});

router.get('/:id/reviews/:reviewer_id/edit', function(req, res) {
  connectionPool.getConnection(function(err, connection) {
    if (err) { throw err; }
    var query = "SELECT pr.id, pr.reviewer_id, pr.factor_id, pr.rating, pr.review_date, "
      + "(SELECT name FROM employee WHERE id=pr.reviewer_id) as reviewer "
      + "FROM performance_review pr "
      + "WHERE pr.employee_id = " + req.params.id + " "
      + "AND pr.reviewer_id = " + req.params.reviewer_id;

    connection.query(query, function (err, result) {
      if (err) { throw err; }
      connection.release();
      res.send(result);
    });
  });
});

router.put('/:id/reviews/:reviewer_id/edit', function(req, res) {
  connectionPool.getConnection(function(err, connection) {
    if (err) { throw err; }
    var body = req.body;
    var queries = `
      UPDATE performance_review SET rating = ${body[0].rating}
      WHERE id = ${body[0].id} AND factor_id = ${body[0].factor_id}; \
      UPDATE performance_review SET rating = ${body[1].rating}
      WHERE id = ${body[1].id} AND factor_id = ${body[1].factor_id}; \
      UPDATE performance_review SET rating = ${body[2].rating}
      WHERE id = ${body[2].id} AND factor_id = ${body[2].factor_id}; \
      UPDATE performance_review SET rating = ${body[3].rating}
      WHERE id = ${body[3].id} AND factor_id = ${body[3].factor_id}; \
      UPDATE performance_review SET rating = ${body[4].rating}
      WHERE id = ${body[4].id} AND factor_id = ${body[4].factor_id}; \
      UPDATE performance_review SET rating = ${body[5].rating}
      WHERE id = ${body[5].id} AND factor_id = ${body[5].factor_id}; \
      UPDATE performance_review SET rating = ${body[6].rating}
      WHERE id = ${body[6].id} AND factor_id = ${body[6].factor_id}; \
      UPDATE performance_review SET rating = ${body[7].rating}
      WHERE id = ${body[7].id} AND factor_id = ${body[7].factor_id};`;
    connection.query(queries, function (err, result) {
      if (err) { throw err; }
      connection.release();
      res.send(result);
    });
  });
});

router.post('/:id/reviews/add', function(req, res) {
  connectionPool.getConnection(function(err, connection) {
    if (err) { throw err; }
    var query = "INSERT INTO performance_review (reviewer_id, employee_id, factor_id, rating, review_date) VALUES ?";
    connection.query(query, [req.body], function (err, result) {
      if (err) { throw err; }
      connection.release();
      res.send(result);
    });
  });
});


module.exports = router;
