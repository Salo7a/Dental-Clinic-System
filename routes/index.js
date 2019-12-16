var express = require('express');
var router = express.Router();
const {isAuth} = require('../utils/filters');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('defaultpanel', {
    title: 'Express',
    user: req.user
  });
});
router.get('/test', function (req, res, next) {
  res.render('test', {
    title: 'Express',
    user: req.user
  });
});
module.exports = router;
