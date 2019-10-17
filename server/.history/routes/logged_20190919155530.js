const express = require('express');
const loggedOut = express();

// console Routes
const activation = require('./loggedOut/activation');


loggedOut.use('/activation', activation);
loggedOut.use('/mac', mac);
loggedOut.use('/users', user);

module.exports = loggedOut;