var LinvoDB = require("linvodb3");

var modelName = "tarif";

var schema = {
    console_id: {
        type: String,
        unique: true
    },
    cost: {
        type: String,
        unique: true
    },
    time: {
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

var Tarif = new LinvoDB(modelName, schema, options); 

Tarif.on('updated', function(tarif) { tarif.updated_at = new Date(); })

module.exports = Tarif;