var express = require('express');
var db = require('./model/db');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

// var favicon = require('static-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');

// adding middleware management
// var connect = require('connect');
// var session = require('express-session');
// Routes to .js files (that is, accessible directly from application)
//var users = require('./routes/users');
//var helloworld = require('./routes/helloworld');
//var sampleform = require('./routes/sampleform');

// Index
var routes = require('./routes/index');

// Master Tools
var addMasterTool = require('./routes/addMasterTool');
var listMasterTool = require('./routes/listMasterTool');
// Inventory
var addInventory = require('./routes/addInventory');
var listInventory = require('./routes/listInventory');
// Requests
var addRequest = require('./routes/addRequest');
var listRequest = require('./routes/listRequest');
// Tool Requests
var addToolRequest = require('./routes/addToolRequest');
var approveRequest = require('./routes/approveRequest');

var receivedTools = require('./routes/receivedTools');

// External API
var listInventoryAPI = require('./routes/api/tools');
var listRequestsAPI = require('./routes/api/requests');

// Homepage Bouncer
var engineerIndex = require('./routes/engineerIndex');
var managerIndex = require('./routes/managerIndex');

// Routes to database operations in response to form inputs 
var createMasterTool = require('./model/createMasterTool');
var createInventory = require('./model/createInventory');
var deleteInventory = require('./model/deleteInventory');
var updateInventory = require('./model/updateInventory');
var createRequest = require('./model/createRequest');
var deleteRequest = require('./model/deleteRequest');
var updateRequest = require('./model/updateRequest');
var createToolRequest = require('./model/createToolRequest');
var updateToolRequest = require('./model/updateToolRequest');
var updateMasterTool = require('./model/updateMasterTool');
var deleteMasterTool = require('./model/deleteMasterTool');
var approveTools = require('./model/approveTools');
var updateReceivedTools = require('./model/updateReceivedTools');

// Routes To Reports
var damageReport = require('./routes/damageReport');
var maintReport = require('./routes/maintReport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon());
// app.use(logger('dev'));
// app.use(cookieParser());
// adding session management
/* app.use(session({
    secret: 'keyboardcat',
    saveUninitialized: true,
    resave: true
})); */

// Sample Pages
// app.use('/users', users);
// app.get('/helloworld', helloworld);
// app.get('/sampleform', sampleform);
// Display as a result of a "post" action (in this case from "sampleform.jade")
/* app.post('/showresults', function(req, res) { 
    res.render('showresults', {location: req.body.location, fename: req.body.fename, 
    feemail: req.body.feemail, severity: req.body.severity}); 
}); */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/index', routes);

//API
app.use('/api/tools', listInventoryAPI);
app.use('/api/requests', listRequestsAPI);

// Homepage Redirection
app.get('/engineerIndex', engineerIndex);
app.get('/managerIndex', managerIndex);

// Set of calls to manage Master Tools
app.get('/addMasterTool', addMasterTool);
app.get('/listMasterTool', listMasterTool);
app.post('/createMasterTool', createMasterTool);
app.post('/updateMasterTool', updateMasterTool);
app.post('/deleteMasterTool', deleteMasterTool);

// Set of calls to manage inventory
app.get('/addInventory', addInventory);
app.post('/createInventory', createInventory);
app.get('/listInventory', listInventory);
app.post('/deleteInventory', deleteInventory);
app.post('/updateInventory', updateInventory);

// Set of calls to request management
app.get('/addRequest', addRequest);
app.post('/createRequest', createRequest);
app.get('/listRequest', listRequest);
app.post('/deleteRequest', deleteRequest);
app.post('/updateRequest', updateRequest);

app.get('/addToolRequest', addToolRequest);
app.post('/createToolRequest', createToolRequest);
app.post('/updateToolRequest', updateToolRequest);

app.get('/approveRequest', approveRequest);
app.post('/approveTools', approveTools);

app.get('/receivedTools', receivedTools);
app.post('/updateReceivedTools', updateReceivedTools);

// Set of calls for the reports
app.get('/damageReport', damageReport);
app.get('/maintReport', maintReport);

// Errors section
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Other JS Functions
app.locals.prettyDate = function(dateString){
    var date = new Date(dateString);
    var d = date.getDate();
    var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var m = monthNames[date.getMonth()];
    var y = date.getFullYear();
    return d+' '+m+' '+y;
}

module.exports = app;
