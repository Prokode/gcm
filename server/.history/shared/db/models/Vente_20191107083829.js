var LinvoDB = require("linvodb3");

var modelName = "vente";

const Tarif = {
    hour: { type: String },
    minute: { type: String },
    cost: { type: String },
    _id: { type: String }
};

const Poste =  {
    name: { type: String },,
    arduino_pin: null,
    _id: null
};

const RemainingTime = {
    hour: null,
    minute: null
}
// console.log(Poste);
require('../db');


var schema = {
    unid: {
        type: String,
        unique: true
    },
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
        type: RemainingTime
    },
    created_at: {
        type: Date,
        default: new Date()
    }
}; 

var options = { };

var Vente = new LinvoDB(modelName, schema, options); 

module.exports = Vente;