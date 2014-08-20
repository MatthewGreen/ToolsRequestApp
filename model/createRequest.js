var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var Tool = mongoose.model('ToolRequest');
var nextId;

router.post('/createRequest', function (req,res){
	
	//console.log(Request.length);

	Request.find()
    .sort('-_id')                            //Reverse search to discover last id in collection
    .limit(1)
    .exec(function (err, list) {             //Call to execute the function 
        list.forEach(function (list){        //Needed because of sort
               nextId = (1 + list._id); //Auto-advance id number if other tools exist  
            }); 
            if (!nextId) {
                nextId = 1;
            }

	Request.create({
		_id: nextId,
		RDate: req.body.date,
		RClient: req.body.client,
		RLocation: req.body.location,
		RFFEM: req.body.FEM,
		RFE: req.body.FE,
		RSeverity: req.body.severity
	}, function(err,list){
		console.log(list)
	});
	res.render('index'); 
});
});

module.exports = router;