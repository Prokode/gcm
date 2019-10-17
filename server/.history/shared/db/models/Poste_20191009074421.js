var LinvoDB = require("linvodb3");

var modelName = "poste";

require('../db');

var schema = {
    console_id: {
        type: String,
        unique: true
    },
    arduino_pin: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
    user_id: {
        type: String
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

var Poste = new LinvoDB(modelName, schema, options); 

Poste.on('updated', function(poste) { poste.updated_at = new Date(); })

module.exports = Poste;