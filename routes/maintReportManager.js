var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Inventory = mongoose.model('ToolInventory');
var MTool = mongoose.model('MasterTool');

router.get('/maintReportManager',function (req,res){
	// var id = req.param('id');

	Inventory.find({'NeedsMaintenance': 'Yes'}).populate('_TIMaster').exec(function (err, lists){
		res.render('maintReportManager',{list:lists});
		//console.log('lists test: %s', lists);
	});

});

module.exports = router;