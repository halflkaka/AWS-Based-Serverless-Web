var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');

var Users = []

/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.find().exec(function(err, users){
    res.send(users);
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
})

router.post('/login', function(req, res, next) {
  let user = req.body.email;
  let password = req.body.password;
  

  userModel.findOne({email: user}).exec(function(err, User) {
    if (User.password === password) {
      res.redirect('/');
    } else {
      res.render('login');
    }
  });
})


router.post('/register', function(req, res, next) {
  let user = {
    "email": req.body.email,
    "name": req.body.name,
    "password": req.body.password
  }
  userModel.create(user, function(err, user) {
    res.redirect("/");
  });
});

router.get('/register', function(req, res, next) {
  res.render('register');
});


module.exports = router;
