var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/photos', function(req, res, next) {
  res.render('fotos', { title: 'Fotos' });
})

module.exports = router;
