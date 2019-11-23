var Readable = require("stream").Readable;  
var util = require("util");  
util.inherits(MyStream, Readable);  
function MyStream(opt) {  
  Readable.call(this, opt);
}
MyStream.prototype._read = function() {};  
// hook in our stream
process.__defineGetter__("stdin", function() {  
  if (process.__stdin) return process.__stdin;
  process.__stdin = new MyStream();
  return process.__stdin;
});

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

