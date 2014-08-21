// tools api
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Inventory = mongoose.model('ToolInventory');
// var MTool = mongoose.model('MasterTool');

router.use(function(req, res, next) {
		
		console.log('All Inventory GET Request Received...');

		Inventory.find(function(err, toolsInventory){
			if (err)
				res.send(err);

			res.json(toolsInventory);
			//res.render('index', {tools: tools});
		});
	});

module.exports = router;