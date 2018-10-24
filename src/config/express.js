/* 
 * InStore AI Recommendation API
 * Copyright (c) 2018, Capillary Technologies Pvt. Ltd.
 * sumandeep.banerjee@capillarytech.com
 */

"use strict";

var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser');

module.exports = function () {
    var app = express();

    app.use(express.static('./public'));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    app.use(bodyParser.json());

    require('../routes/user.routes.js')(app);

    return app;
};
