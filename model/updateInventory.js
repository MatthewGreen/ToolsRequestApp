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
			ToolLocation: req.body.ToolLocation, 
			TIStatus: req.body.Condition,
			NeedsMaintenance: req.body.NeedsMaintenance,
			MaintDateLast: req.body.MaintDateLast,
			MaintDescription: req.body.MaintDescription,
			MaintCycle: req.body.MaintCycle
		}}).exec(); 
    //.exec() runs code after grabbing data
    
    res.render('index');
});

module.exports = router;
    