var LinvoDB = require("linvodb3");

var modelName = "board";

require('../db');

var schema = {
    name: {
        type: String,
        unique: true
    },
    com: {
        type: Number,
        default: null
    },
    comBaudRate: {
        type: String,
        default: null
    },
    ip: {
        type: String,
        default: null
    },
    operation_mode: {
        type: String,
        default: 'com'
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: null
    }
}; 

var options = { };

var Board = new LinvoDB(modelName, schema, options); 

Board.on('updated', function(board) { board.updated_at = new Date(); })

module.exports = Board;