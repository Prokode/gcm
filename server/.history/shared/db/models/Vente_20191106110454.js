var LinvoDB = require("linvodb3");

var modelName = "vente";

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
    }
}; 

var options = { };

var Vente = new LinvoDB(modelName, schema, options); 

module.exports = Vente;