var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MasterTool = mongoose.model('MasterTool');
var Inventory = mongoose.model('ToolInventory');

router.post('/createInventory', function(req,res){

	res.render('index');
	
	Inventory.create({
		_TISerialNumber: req.body.Serial,
		TIStatus: req.body.Condition,
		TIInstallDate: req.body.Install,
		_TIMaster: req.body.Name
	},function (err, tool){
		console.log('New Inventory Item Created and Added: ' + tool);
	});
});

module.exports = router;