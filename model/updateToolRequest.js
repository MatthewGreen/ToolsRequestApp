var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');

router.post('/updateToolRequest', function (req,res){
	Request.findById(req.body.formID)
	.populate('ToolRequest')
	.exec(function (err, array) {
		console.log(array.ToolRequest);
		console.log('length: ' + array.ToolRequest.length);
		console.log('hard Name: ' + req.body.name1);
		var g = 1;
		console.log('dynamic Name: ' + req.body['name'+[g]]);
		for (var i = 1, l = array.ToolRequest.length; i <= l; i++) {
			formID = req.body.formID;
			id = i;
			name = req.body['name'+[i]];
			start = req.body['start'+[i]];
			end = req.body['end'+[i]];
			console.log(formID, id, name, start, end);
			console.log('current iteration: ' + [i]);
			Request.update(
				{
					_id: formID,
					'ToolRequest._id': id },
				{$set: {
					'ToolRequest.$._masterTool': name,
					'ToolRequest.$.Start': start,
					'ToolRequest.$.End': end
				}}, function(err, num){
					if(!err){
						console.log('no error - loop');
					}else{
						console.log('err - loop');
						console.log(name, start, end)
					}
				}	
			);
			/*
			--Must populate the subdocument (array) (line 9)
			--Refer back to main Schema (Request in this case) (line 24)
			--loop through the array for every value (line 16)
			--set values from submission as variables (fixes a bug) (lines 17:21)
			.update syntax:
				{Parent Schema}.update(
					{
						_id: {Parent Schema id containing desired array},
						{arrayName._id} : {array id (loop number)}
					},
					{$set: {
						{ArrayName.$.FieldName} : {value}, ($ holds array index value 0-{1<arrayTotal}),
						{ArrayName.$.FieldName} : {value}

					}}, {exit function}
				})
			*/
		}
		//console.log('array contents: ' + array);	
	});
    res.render('index');
});

module.exports = router;