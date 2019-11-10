var LinvoDB = require("linvodb3");

var modelName = "vente";

var Tarif = {
    hour: null,
    minute: null,
    cost: null,
    _id: null
}
var Poste =  require('.Poste');
// console.log(Poste);
require('../db');

var remaining_time_obj = {
    hour: null,
    minute: null
}

var schema = {
    unid: {
        type: String,
        unique: true
    },
    poste: {
        type: any,
    },
    tarif: {
        type: any
    },
    user_id: {
        type: String
    },
    remaining_time: {
        type: remaining_time_obj
    },
    created_at: {
        type: Date,
        default: new Date()
    }
}; 

var options = { };

var Vente = new LinvoDB(modelName, schema, options); 

module.exports = Vente;