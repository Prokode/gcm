// express app
const express = require('express');
const app = require('./app_inits').app;


// http server
const server = require('./app_inits').server;


// midellewares
const ErrorHandler = require('./middlewares/error-handler');
const bodyParser = require('body-parser');
const passport = require('passport');
const AppIdentity = require('./middlewares/appIdentity');

//Models
const Board = require('./shared/db/models/Board');


// Routes list per App
var loggedOut = require('./routes/loggedOut');
var auth = require('./routes/auth');
var logged = require('./routes/logged');
var web = require('./routes/web');


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,authorization,x-app-id,x-auth-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
      if ( req.method === 'OPTIONS' ) { 
        res.sendStatus(200);
      } else {
        next();
      }
});

// passport for authentification and request authentification
require('./middlewares/passport');
// require('./shared/db/db');
// body-parser
app.use(bodyParser.json());

// static folder for web app
app.use('/asset', express.static(__dirname +'/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// routes 
// logged_out_routes
app.use('/logged-out', [AppIdentity], loggedOut);

// auth_out_routes
app.use('/auth', [AppIdentity], auth);

// logged routes
app.use('/logged', [AppIdentity, passport.authenticate('jwt', {session: false})], logged);

app.use('/web', [AppIdentity], web);

// Error handler middlewares
app.use(ErrorHandler);

// app.listen(8080, function() {
//     console.log('ready to accept request on localhost:8080/');
// });

// var server = require('http').Server(app);

// var io = require('socket.io')(server);

server.listen(8080, function() {
  console.log('ready to accept request on localhost:8080/');
});

//Selle update cron JOB

require('./sells_update_cron_job.js');

// console.log(io);

// Handle unhandled rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled error: ${err.message}`);
  // Close server & exit process
  server.close(() => {
      process.exit(1);
  });
});


// Exiting processing


// var arduinoFilter = ()  => {
//   var results = [];
//   return new Promise((resolve, reject) => {
//     Board.find({}).sort({ created_at: -1 }).exec(function (err, boards) {
//       if (err) {
//          console.log(err);
//       }
//       if (boards.length > 0) {
//         boards.forEach((board, id) => {
//           if (board.operation_mode === 'ip') {
//               results.push(board);
//           }
//           if (id === (boards.length - 1)) {
//               resolve(results);
//           }
//         });
//       }
//     });
//   });
  
// }

// var esp32InitializationRequests = (arr) => {
//   var results = [];

//   return new Promise((resolve, reject) => {
//     arr.forEach(async (board, id) => {
//       if (board.operation_mode === 'ip') {
//         // await fetch request to initialize the board
//       }
//       if (id === (arr.length - 1)) {
//           resolve();
//       }
//     });
//   });
  
// }

// process.on('exit', async function (code) {
 
//   var ipBoards;

//   await arduinoFilter().then(
//       (results) => {
//         ipBoards = results;
//       }
//     );

//   console.log(ipBoards);
    
//   if(ipBoards.length > 0) {
//       await esp32InitializationRequests(ipBoards);
//     }

//   return console.log(`Process to exit with code ${code}`);
    
// });

module.exports = app;