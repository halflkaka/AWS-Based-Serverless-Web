var express = require('express');
var router = express.Router();
var UserAuth = require('../utils/UserAuth');
var jwt = require('jsonwebtoken');
var cookies = require("cookie-parser");

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

router.post('/verify', function(req, res, next) {
  console.log(req.body.token);
  jwt.verify(req.body.token, "my_secret", function(err, decoded) {
    if (err) {
      console.log("error");
      res.sendStatus(403);
    } else {
      console.log(decoded);
      let result = {username: decoded.user.email};
      console.log(result.username);
      res.status(201).json(result);
    }
  });
});

function ensureToken(req, res, next) {
  const token = req.headers["authorization"];
  console.log('Verifying token', token);
  // let token = sessionStorage.getItem('accessToken');
  console.log(token);
  if (typeof token !== 'undefined') {
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
};


// router.get('/logout', UserAuth.logOut);

module.exports = router;
