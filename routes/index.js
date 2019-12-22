var express = require('express');
var router = express.Router();
const {isAuth} = require('../utils/filters');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', {
    title: 'Home',
    user: req.user
  });
});
router.get('/panel', function (req, res, next) {
  res.render('defaultpanel', {
    title: 'Panel Demo',
    user: req.user
  });
});
module.exports = router;
