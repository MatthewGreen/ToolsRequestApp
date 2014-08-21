var express = require('express');
var router = express.Router();

var app = express();

/* GET sample form page. */
router.get('/engineerIndex', function(req, res) {
  res.render('engineerIndex');
});

module.exports = router;