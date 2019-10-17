var LinvoDB = require("linvodb3");
var modelName = "user";
var schema = {
    username: {
        type: String,
        required: [true, 'field required'],
    },
    password: {
        type: String,
        required: [true, 'field required']
    },
    role: {
        type: String,
        required: [true, 'field required']
    }
}; // Non-strict always, can be left empty
var options = { };
// options.filename = "./test.db"; // Path to database - not necessary 
// options.store = { db: require("level-js") }; // Options passed to LevelUP constructor 
var User = new LinvoDB(modelName, schema, options); 

module.exports = 