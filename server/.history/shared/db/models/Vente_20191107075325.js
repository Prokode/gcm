var LinvoDB = require("linvodb3");

var modelName = "vente";

var Tarif = {
    hour: null,
    minute: null,
    cost: null,
    _id: null
};
var Poste =  {
    name: null,
    arduino_pin: null,
    _id: null
};
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