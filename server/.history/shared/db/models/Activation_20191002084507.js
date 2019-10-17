var LinvoDB = require("linvodb3");

var modelName = "activation";

var schema = {
    token: {
        type: String,
        unique: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: null
    }
}; 

var options = { };
 
var Activation = new LinvoDB(modelName, schema, options); 

Activation.on('updated', function(activation) { activation.updated_at = new Date(); });

LinvoDB.dbPath // default path where data files are stored for each model
LinvoDB.defaults // default options for every model

module.exports = Activation;