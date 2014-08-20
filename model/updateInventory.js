var express = require('express');
var router = express.Router();
//var url = require('url');
var mongoose = require('mongoose');
var Inventory = mongoose.model('ToolInventory');

router.post('/updateInventory', function (req,res){
	Inventory.update({_id:req.body.id},
		{$set: {
			_TISerialNumber: req.body.Serial,
			TIInstallDate: req.body.Install, 
			TIStatus: req.body.Condition
		}}).exec(); 
    //.exec() runs code after grabbing data
    
    res.render('index');
});

module.exports = router;
    