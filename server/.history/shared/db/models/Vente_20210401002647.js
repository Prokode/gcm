var LinvoDB = require("linvodb3");

var modelName = "vente";

const Tarif = {
    hour: { type: String },
    minute: { type: String },
    second: { type: String, default: '00' },
    cost: { type: String },
    _id: { type: String }
};

const Poste =  {
    name: { type: String },
    arduino_pin: { type: String },
    _id: { type: String }
};

const RemainingTime = {
    hour: { type: String },
    minute: { type: String },
    second: { type: String, default: '0' }
}

const Console = {
    name: { type: String, default : null},
    _id:  { type: String, default: null }
}

// console.log(Poste);
require('../db');

var schema = {
    unid: {
        type: String,
        unique: true
    },
    poste: Poste,
    console: Console,
    tarif: Tarif,
    user_id: {
        type: String
    },
    remaining_time: RemainingTime,
    wasStop: {
        type: Boolean,
        default: false
    },
    wasEnd: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: new Date()
    }
}; 

var options = { };

var Vente = new LinvoDB(modelName, schema, options); 

module.exports = Vente;