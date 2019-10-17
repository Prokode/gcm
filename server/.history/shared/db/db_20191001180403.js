var LinvoDB = require("linvodb3");

// The following two lines are very important
// Initialize the default store to level-js - which is a JS-only store which will work without recompiling in NW.js / Electron
// LinvoDB.defaults.store = { db: require("level-js") }; // Comment out to use LevelDB instead of level-js
// Set dbPath - this should be done explicitly and will be the dir where each model's store is saved
// LinvoDB.defaults.filename = "./arrk.db";

LinvoDB.dbPath = process.cwd(); 

// var User = require('./models/User');

// var user = new User({ username: 'sam', password: 'password', role: "admin" });
// user.save(function(err) { 
// 	// Document is saved
// 	console.log(user._id);
// });

User.find({}, function (err, docs) {
    // docs is an array containing documents Mars, Earth, Jupiter
    // If no document is found, docs is equal to []
    console.log(docs);
  });