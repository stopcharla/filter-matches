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
    endpoint: 'api',
    filterToDbEntryMappings:{
        ageFrom:"age",
        hasFace:"main_photo",
        favourite:"favourite",
        compatibilityScoreFrom:"compatibility_score",
        inContact:"contacts_exchanged",
        heightFrom:"height_in_cm",
        radius:"loc"
    },
    queryParameters:{
        ageFrom:"ageFrom",
        ageTo:"ageTo",
        favourite:"favourite",
        compatibilityScoreFrom:"compatibilityScoreFrom",
        compatibilityScoreTo:"compatibilityScoreTo",
        inContact:"inContact",
        heightFrom:"heightFrom",
        heightTo:"heightTo",
        radius:"radius",
        hasFace:"hasFace"
    },
    maxAge:95,
    maxHeight:210,
    maxCompaitablityScore:99
};