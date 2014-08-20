var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var Inventory = mongoose.model('ToolInventory');
var MTool = mongoose.model('MasterTool');

router.get('/receivedTools', function (req, res){
	var id = req.param('id');
	if (id !== undefined){
		console.log('link clicked')
		Request.findById(id)
		.populate('ToolRequest')
		.exec(function (err, request){
			MTool.populate(request, {path: 'ToolRequest._masterTool'},
				function (err, tool){
					Inventory.populate(tool, {path: 'ToolRequest._ToolInventory'},
						function (err, inventory){
							res.render('editreceivedTools', {request:request, tool:tool, inventory:inventory});
						});
				});
		});
	}else {
		Request.find()
		.populate('ToolRequest')
		.exec(function (err, request){
			MTool.populate(request, {path: 'ToolRequest._masterTool'},
				function (err, tool){
					Inventory.populate(tool, {path: 'ToolRequest._ToolInventory'},
						function (err, inventory){
							res.render('receivedTools', {request:request, tool:tool, inventory:inventory});
						});
				});
		});	
	}
	
});

module.exports = router;