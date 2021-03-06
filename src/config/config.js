

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

    valueFrom: "valueFrom",
    valueTo: "valueTo",

    ignoreQuery:"considerQuery",
    minAge:18,
    maxAge:95,
    minHeight:135,
    maxHeight:210,
    minCompaitablityScore:1,
    maxCompaitablityScore:99,
    minDistance:30,
    maxDistance:300
};
