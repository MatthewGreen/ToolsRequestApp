var mongoose = require('mongoose');   // Adding the dependency to Mongooose
var dbURI = 'mongodb://localhost/db'; // Specifying the path to the database
mongoose.connect(dbURI);              // Connecting to the database

// Setup Schemas

// MasterTool
var MasterToolSchema = new mongoose.Schema({
	_id: Number,
	MTName: String,
	MTDescription: String,
	MTPrice: Number,
	MTWeight: Number
})

// ToolInventory
var ToolInventorySchema = new mongoose.Schema({
	_TISerialNumber: String,
	TIStatus: String,
	TIInstallDate: Date,
	Avaliable: Boolean,
	_TIMaster: {
		type: Number,
		ref: 'MasterTool'
	}
})

// Request
var RequestSchema = new mongoose.Schema({
	_id: Number,
	RDate: Date,
	RClient: String,
	RLocation: String,
	RFFEM: String,
	RFE: String,
	RSeverity: String,
	ToolRequest: [ToolRequestSchema]
})

// ToolRequest
var ToolRequestSchema = new mongoose.Schema({
	_id: Number,
	_masterTool: {
		type: Number,
		ref: 'MasterTool'
	},
	Start: Date,
	End: Date,
	Status: String,
	
	_ToolInventory: {
		type: Number,
		ref: 'Inventory'
	},
	Approval: String

})

// Create Models
// Model to call, Schema to use, name of table in db
mongoose.model('MasterTool', MasterToolSchema, 'masterTool');
mongoose.model('ToolInventory', ToolInventorySchema, 'inventory');
mongoose.model('Request', RequestSchema, 'request');
mongoose.model('ToolRequest', ToolRequestSchema, 'toolRequest');