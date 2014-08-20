var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');

router.post('/updateRequest', function (req, res){
	Request.update({_id: req.body.id},
		{$set: {
			RDate: req.body.Install,
			RClient: req.body.client,
			RLocation: req.body.location,
			RFFEM: req.body.FFEM,
			RFE: req.body.FE,
			RSeverity: req.body.severity
		}}).exec();
	res.render('index');
});

module.exports = router;