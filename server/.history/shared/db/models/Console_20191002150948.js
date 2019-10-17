var LinvoDB = require("linvodb3");

var modelName = "console";

require('../db');

var schema = {
    name: {
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

/****************************/ 
User.on('save', function(user) { user.password = pwdhash.generate(user.password); });

Console.on('updated', function(console) { console.updated_at = new Date(); })

module.exports = Console;