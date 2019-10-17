var LinvoDB = require("linvodb3");

// The following two lines are very important
// Initialize the default store to level-js - which is a JS-only store which will work without recompiling in NW.js / Electron
// LinvoDB.defaults.store = { db: require("level-js") }; // Comment out to use LevelDB instead of level-js
// Set dbPath - this should be done explicitly and will be the dir where each model's store is saved
LinvoDB.defaults.filename = "./arrk.db";
LinvoDB.dbPath = process.cwd(); 

require('./models/User');

var duser = new user({ username: '', now: new Date(), test: "this is a string" });
doc.save(function(err) { 
	// Document is saved
	console.log(doc._id);
});