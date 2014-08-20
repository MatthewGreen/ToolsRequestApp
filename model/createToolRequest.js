var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');

router.post('/createToolRequest', function (req,res){
	Request.findById(req.body.request)
	.exec(function (err, request) {
		if (request.ToolRequest.length !== undefined) {
				var nextid = request.ToolRequest.length + 1;
			}
		else {
			var nextid = 1;
		}
		request.ToolRequest.push({
			_id: nextid,
			_masterTool: req.body.tool,
			Start: req.body.start,
			End: req.body.end,
		});
		request.save(function (err, sent) {
			if(!err) {
				console.log('sent')
			}
			else{
				console.log('error')
			}
		});
	});
	
	res.render('index'); 
});

module.exports = router;