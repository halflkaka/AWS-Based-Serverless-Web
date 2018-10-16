let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/shop', function(req, res, next) {
  res.render('shop');
});


module.exports = router;
