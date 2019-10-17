const express = require('express');
const loggedOut = express();

// activation Routes
const activation = require('./loggedOut/activation');
const mac = require('./loggedOut/mac');
const user = require('./loggedOut/user');

// loggedOut.use('/activation', activation);
loggedOut.use('/mac', mac);
loggedOut.use('/users', user);

module.exports = loggedOut;