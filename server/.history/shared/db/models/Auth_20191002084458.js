var LinvoDB = require("linvodb3");

var modelName = "auth";

var schema = {
    token: {
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
    },
    delated_at: {
        type: Date,
        default: null
    }
}; 

var options = { };

var Auth = new LinvoDB(modelName, schema, options); 

Auth.on('updated', function(auth) { auth.updated_at = new Date(); })

LinvoDB.dbPath // default path where data files are stored for each model
LinvoDB.defaults // default options for every model

module.exports = Auth;