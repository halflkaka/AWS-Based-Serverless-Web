var express = require('express');
var router = express.Router();
var UserAuth = require('../utils/UserAuth');
var jwt = require('jsonwebtoken');
// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client("577145700233-8jqcdshv8hpektmiiutog3dot4800ju4.apps.googleusercontent.com");

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

router.post('/tokensignin', UserAuth.googleToken);

router.post('/verify', function(req, res, next) {
  console.log(req.body.type);
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

// router.get('/logout', UserAuth.logOut);

module.exports = router;
