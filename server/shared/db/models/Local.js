var LinvoDB = require("linvodb3");

var modelName = "local";

require('../db');

var schema = {
    currentDateTime: {
        type: Date
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

var Local = new LinvoDB(modelName, schema, options); 

Local.on('updated', function(local) { local.updated_at = new Date(); })

module.exports = Local;