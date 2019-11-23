const express = require('express');

// express app
//  npm rebuild serialport --update-binary
const app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

module.exports = {
    app: app,
    io: io, 
    server: server
}

