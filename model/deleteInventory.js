var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Inventory = mongoose.model('ToolInventory');

router.post('/deleteInventory', function (req,res){
	Inventory.remove({_id:req.body.id}).exec(); 
    //.exec() runs code after grabbing data
    res.render('index'); 
})

module.exports = router;
    