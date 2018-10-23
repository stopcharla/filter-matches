"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./src/config/config'),
    mongoose = require('./src/config/mongoose'),
    express = require('./src/config/express');

var db = mongoose(),
    app = express();

app.listen(config.port);

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);
