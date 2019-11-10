var LinvoDB = require("linvodb3");

var modelName = "console";

require('../db');

var schema = {
    poste_id: {
        type: String,
        unique: true
    },
    img: {
        type: String,
        default: null
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