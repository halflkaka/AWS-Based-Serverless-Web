var express = require('express');
var router = express.Router();
// var userModel = require('../models/userModel');
var UserAuth = require('../utils/UserAuth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM users ', function(err, rows) {
    if (err) {  
        console.log(err);
    }
    res.send(rows);
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
})

router.post('/login', UserAuth.login);

router.post('/register', UserAuth.registration);

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/authenticate', UserAuth.authentication);


// router.get('/send', UserAuth.sendEmail);

// router.get('/verify', UserAuth.verifyEmail);

// router.get('/logout', UserAuth.logOut);

module.exports = router;
