const express = require('express');
const loggedOut = express();

// activation Routes
const activation = require('./loggedOut/activation');
const mac = require('./loggedOut/mac');
const user = require('./loggedOut/user');
const local = require('./loggedOut/local');

loggedOut.use('/activation', activation);
loggedOut.use('/mac', mac);
loggedOut.use('/user', user);
loggedOut.use('/local', local);

module.exports = loggedOut;