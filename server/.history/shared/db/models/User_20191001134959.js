var LinvoDB = require("linvodb3");
var modelName = "user";
var schema = { }; // Non-strict always, can be left empty
var options = { };
// options.filename = "./test.db"; // Path to database - not necessary 
// options.store = { db: require("level-js") }; // Options passed to LevelUP constructor 
var Doc = new LinvoDB(modelName, schema, options); 