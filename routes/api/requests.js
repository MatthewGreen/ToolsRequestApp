// requests API
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Inventory = mongoose.model('ToolInventory');
var MTool = mongoose.model('MasterTool');
var Request = mongoose.model('Request');

router.use(function(req, res, next) {
		
		console.log('All Requests GET Request Received...');

		Request.find(function(err, listRequests){
			if (err)
				res.send(err);

			res.json(listRequests);
			//res.render('index', {tools: tools});
		});
	});

module.exports = router;