var express = require('express');
var router = express.Router();
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

router.post('/tokensignin', UserAuth.googleToken);

router.post('/verify', UserAuth.verifyToken);

module.exports = router;
