const express = require('express');
const loggedOut = express();

// activation Routes
const activation = require('./loggedOut/activation');
const mac = require('./loggedOut/mac');
const user = require('./loggedOut/user');
const local = require('./loggedOut/local');
const configs = require('./loggedOut/configs');
const board  = require('./loggedOut/board');

loggedOut.use('/activation', activation);
loggedOut.use('/mac', mac);
loggedOut.use('/user', user);
loggedOut.use('/local', local);
loggedOut.use('/configs', configs);
loggedOut.use('/board', board);

module.exports = loggedOut;
