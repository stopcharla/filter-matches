/* 
 * InStore AI Recommendation API
 * Copyright (c) 2018, Capillary Technologies Pvt. Ltd.
 * sumandeep.banerjee@capillarytech.com
 */

"use strict";

var serverip = 'localhost';
var mongoport = 27017
var port = 8123;

module.exports = {
    port: port,
    db: 'mongodb://' + serverip +':'+mongoport+ '/sparkDatabase',
    endpoint: 'api'
};
