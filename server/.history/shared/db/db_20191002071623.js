var LinvoDB = require("linvodb3");
const globals = require('../globals');

console.log()
// DB path
LinvoDB.dbPath = globals.DB_PATH; 
LinvoDB.defaults.filename = './arrkb.db';

// var User = require('./models/User');

// var user = new User({ username: 'sam', password: 'password', role: 'admin' });

// user.save(function(err) { 
// 	// Document is saved
// 	console.log(user._id);
// });

// User.find({}, function (err, docs) {
//     // docs is an array containing documents Mars, Earth, Jupiter
//     // If no document is found, docs is equal to []
//     docs.forEach(element => {
//       console.log(element.password);
//     });
//     // console.log(docs.username);
//   });