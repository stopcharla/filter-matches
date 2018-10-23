/* 
 * InStore AI Recommendation API
 * Copyright (c) 2018, Capillary Technologies Pvt. Ltd.
 * sumandeep.banerjee@capillarytech.com
 */

"use strict";

var config = require('./config'),
        mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);

    console.log("connected to db");

    require('../models/matches.model');

    return db;
};
