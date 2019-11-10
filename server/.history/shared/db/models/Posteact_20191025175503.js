var LinvoDB = require("linvodb3");
var modelName = "posteact";

require('../db');

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
 
var Posteact = new LinvoDB(modelName, schema, options); 

Activation.on('updated', function(activation) { activation.updated_at = new Date(); });

module.exports = Activation;