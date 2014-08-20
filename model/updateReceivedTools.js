var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var Inventory = mongoose.model('ToolInventory');

router.post('/updateReceivedTools', function (req, res){
	Request.findById(req.body.id)
	.populate('ToolRequest')
	.exec(function (err, array){
		for (var i = 1, l = array.ToolRequest.length; i <= l; i++){
			id = i;
			formId = req.body.id
			shipping = req.body['shipping' + [i]];
			condition = req.body['condition' + [i]];
			serial = req.body['serial' + [i]];
			console.log(id, formId, shipping, condition, serial);
			if (shipping !== 'returned' && condition !== 'working'){
				available = false
			}else {
				available = true
			}
			/*sets each variable to the coresonding subdocument in Request
			iterates through each time
			
			if statement checks if the tool has been returned and is in working condition if so
				make the tool available again

			next update both request and inventory with their respective entries, 
			skipping inventory if the item does not have a serial number*/

			Request.update(
			{
				_id: formId,
				'ToolRequest._id' : id},
				{$set: {
					'ToolRequest.$.Approval' : shipping
				}}).exec();
			if (serial !== undefined) {
				Inventory.update(
				{
					_TISerialNumber: serial
				},
				{$set: {
					'TIStatus' : condition,
					'Available' : available
				}}).exec();
			}
		}
			
						
	});
	res.render('index');
})

module.exports = router;