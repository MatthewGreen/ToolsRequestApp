var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Inventory = mongoose.model('ToolInventory');
var MTool = mongoose.model('MasterTool');

router.get('/damageReport',function (req,res){
	// var id = req.param('id');

	Inventory.find(  {$or:[{'TIStatus': 'Broken'},{'TIStatus': 'Poor'}]}).populate('_TIMaster').exec(function (err, lists){
		res.render('damageReport',{list:lists});
		console.log('lists test: %s', lists);
	});

});

module.exports = router;