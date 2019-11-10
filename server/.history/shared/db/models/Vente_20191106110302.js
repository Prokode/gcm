var LinvoDB = require("linvodb3");

var modelName = "console";

var Tarif = require('./Tarif');

require('../db');

var schema = {
    poste_id: {
        type: String
    },
    tarif: {
        type: Tarif
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

var Console = new LinvoDB(modelName, schema, options); 

Console.on('updated', function(console) { console.updated_at = new Date(); })

module.exports = Console;