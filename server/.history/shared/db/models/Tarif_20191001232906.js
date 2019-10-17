var LinvoDB = require("linvodb3");

var modelName = "console";

var schema = {
    console_id: {
        type: String,
        unique: true
    },
    cost: {
        type: String,
        unique: true
    },
    console_id: {
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

var Console = new LinvoDB(modelName, schema, options); 

Console.on('updated', function(console) { console.updated_at = new Date(); })

module.exports = Console;