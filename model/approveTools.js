var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var MTool = mongoose.model('MasterTool');

router.post('/approveTools', function (req,res) {
	Request.findById(req.body.formID)
	.populate('ToolRequest')
	.exec(function (err, request) {
		for (var i = 1, l = request.ToolRequest.length; i <= l; i++) {
			id = i
			formID = req.body.formID;
			serialID = req.body['approval' + [i]];
			action = req.body['approval' + [i]];
			status='Approved';
			if (serialID != 'purchase' && serialID != 'rent' && serialID != 'notApproved') {
				serialID = serialID;
				action = null;
			}else{
				if (serialID == 'notApproved'){
				serialID = null;
				status = 'Not Approved';
				}else{
					serialID = null;
					action = action;
				}
				
			}
			//console.log(formID, serialID, action)
			Request.update(
				{
					_id: formID,
					'ToolRequest._id': id},
				{$set: {
					'ToolRequest.$._ToolInventory' : serialID,
					'ToolRequest.$.Approval' : action,
					'ToolRequest.$.Status' : status

				}}, function(err, num){
					if (!err){
						if (serialID != 'purchase' && serialID != 'rent' && serialID != 'notApproved') {
							console.log(i + ' ' + serialID);
						}else {
							console.log(i + ' ' + serialID);
						}	
						
					}else{
						console.log('loop err - ' + i);
					}			
				}
			);
		}
	});
	res.render('index');
});

module.exports = router;