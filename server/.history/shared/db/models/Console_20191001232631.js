var LinvoDB = require("linvodb3");

var modelName = "console";

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

var Auth = new LinvoDB(modelName, schema, options); 

Auth.on('updated', function(auth) { auth.updated_at = new Date(); })

module.exports = Auth;