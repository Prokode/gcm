const express = require('express');
const loggedOut = express();

// activation Routes
const activation = require('./loggedOut/activation');
const mac = require('./loggedOut/mac');
const user = require('./loggedOut/ctivation');

loggedOut.use('/activation', activation);
loggedOut.use('/mac', mac);

module.exports = loggedOut;