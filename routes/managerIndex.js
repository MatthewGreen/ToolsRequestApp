var express = require('express');
var router = express.Router();

var app = express();

/* GET sample form page. */
router.get('/managerIndex', function(req, res) {
  res.render('managerIndex');
});

module.exports = router;