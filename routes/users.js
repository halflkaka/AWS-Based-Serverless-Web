var express = require('express');
var router = express.Router();
// var userModel = require('../models/userModel');
var UserAuth = require('../utils/UserAuth');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.con;
  db.query('SELECT * FROM users ', function(err, rows) {
    if (err) {  
        console.log(err);
    }
    res.send(rows);
  });
});

router.post('/login', UserAuth.login);

router.post('/register', UserAuth.registration);


router.post('/authenticate', UserAuth.authentication);

router.post('/tokensignin', function(req, res, next) {
  console.log(req.body);
  let result = { msg: "Login"};
  res.status(201).json(result);
});

router.get('/secret', ensureToken, function(req, res, next) {
  jwt.verify(req.token, "my_secret", function(err, data) {
    if (err) {
      console.log("error");
      res.sendStatus(403);
    } else {
      console.log("sd");
      res.json({
        description: 'Protected information. Congrats!'
      });
    }
  });
});

function ensureToken(req, res, next) {
  const token = req.headers["authorization"];
  if (typeof token !== 'undefined') {
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
};


// router.get('/logout', UserAuth.logOut);

module.exports = router;
