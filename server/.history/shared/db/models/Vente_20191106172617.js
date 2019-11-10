var LinvoDB = require("linvodb3");

var modelName = "vente";

var Tarif = require('./Tarif');
var Poste = require('./Poste');

require('../db');

var remaining_

var schema = {
    poste: {
        type: Poste
    },
    tarif: {
        type: Tarif
    },
    user_id: {
        type: String
    },
    remaining_time: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date()
    }
}; 

var options = { };

var Vente = new LinvoDB(modelName, schema, options); 

module.exports = Vente;