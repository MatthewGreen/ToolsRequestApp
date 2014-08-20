var express = require('express');
var router = express.Router();
//var url = require('url');
var mongoose = require('mongoose');
var MTool = mongoose.model('MasterTool');

router.post('/updateMasterTool', function (req,res){
    MTool.update({_id: req.body.id},
        {$set: {                                  //$set is the MongoDB update instruction
            MTName: req.body.name,                //name in db, then form name
            MTDescription: req.body.description,
            MTPrice: req.body.price,
            MTWeight: req.body.weight
        }}).exec();  //.exec() runs code on after grabbing data

    res.render('index');
});

module.exports = router;