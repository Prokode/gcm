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
    }
}; // Non-strict always, can be left empty

var options = { };
// options.filename = "./test.db"; // Path to database - not necessary 
// options.store = { db: require("level-js") }; // Options passed to LevelUP constructor 
var Auth = new LinvoDB(modelName, schema, options); 

Auth.on('updated', function(auth) { user.updated_at = new Date(); })

module.exports = User;