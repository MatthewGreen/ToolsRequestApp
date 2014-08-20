var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');

router.post('/deleteRequest', function (req, res){
	Request.remove({_id:req.body.id}).exec()
	res.render('index');
})

module.exports = router;