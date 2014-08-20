var express = require('express');
var router = express.Router();               //External reference to the routing mechanism
var mongoose = require('mongoose');          //Adding reference to Mongoose
var MTool = mongoose.model('MasterTool');    // Adding reference to the specific model in the db file
var nextId;

router.post('/createMasterTool', function (req,res){  //Result of the post method in "addMasterTool.jade"
    
    res.render('index');             //Return to "addMasterTool" after the database operation 

    MTool.find()
    .sort('-_id')                            //Reverse search to discover last id in collection
    .limit(1)
    .exec(function (err, tool) {             //Call to execute the function 
        tool.forEach(function (tool){        //Needed because of sort
               nextId = (1 + tool._id); //Auto-advance id number if other tools exist  
            }); 
            if (!nextId) {
                nextId = 1;
            }
            
            MTool.create({                   //Create method adds the form input to the collection
                _id: nextId,
                MTName: req.body.MTName,
                MTDescription: req.body.MTDescription,
                MTPrice: req.body.MTPrice,
                MTWeight: req.body.MTWeight
                }, function (err, tool){
                    console.log(err);
                console.log('Tool created and saved: ' + tool);
                }
            );
    });
});

module.exports = router;