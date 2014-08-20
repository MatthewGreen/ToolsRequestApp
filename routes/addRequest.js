var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var MTool = mongoose.model('MasterTool');


router.get('/addRequest', function (req, res){
	 
		MTool.find()
		.exec(function (err, toolList){
			res.render('addRequest');	
		})
});

module.exports = router;