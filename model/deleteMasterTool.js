var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MTool = mongoose.model('MasterTool');

router.post('/deleteMasterTool', function (req,res){

	MTool.remove({_id:req.body.id}).exec();       //remove is the MongoDB delete instruction

    res.render('index');

});

module.exports = router;