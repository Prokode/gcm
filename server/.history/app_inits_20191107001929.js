const express = require('express');

// express app
const app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);



