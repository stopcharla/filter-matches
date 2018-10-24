const MatchesModel = require('../models/matches.model');
const config = require('../config/config');

var getCurrentUser = function (req, res) {
    getUser().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err);
    });
};

var getMatches = function (req, res) {
   
};

var getFilterQuery = function getFilterQuery(req) {
    let queryParams = req.query;
    let condition = {};
    if (queryParams !== null && typeof (queryParams) !== 'undefined') {
        let availableQueryParams = config.queryParameters;
        let dbMappings = config.filterToDbEntryMappings;
        Object.keys(queryParams).forEach((key) => {
            switch (key) {
                case availableQueryParams.ageFrom:{
                    condition[dbMappings.ageFrom] = {
                        $gte: parseInt(queryParams[key]),
                        $lte: parseInt(queryParams[availableQueryParams.ageTo]) || config.maxAge
                    }
                    break;
                }

                case availableQueryParams.hasFace:{
                    if (parseInt(queryParams[key]) === 0) {
                        condition[dbMappings.hasFace] = { $eq: null };
                    } else if (parseInt(queryParams[key]) === 1) {
                        condition[dbMappings.hasFace] = { $ne: null };
                    }
                    break;
                }

                case availableQueryParams.favourite:{
                    let isFavourite = false;
                    if (parseInt(queryParams[key]) === 1) {
                        isFavourite = true;
                    }
                    condition[dbMappings.favourite] = isFavourite;
                    break;
                }

                case availableQueryParams.compatibilityScoreFrom:{
                    condition[dbMappings.compatibilityScoreFrom] = {
                        $gte: parseInt(queryParams[key]),
                        $lte: parseInt(queryParams[availableQueryParams.compatibilityScoreTo]) || config.maxCompaitablityScore
                    }
                    break;
                }

                case availableQueryParams.inContact:{
                    condition[dbMappings.inContact] =  parseInt(queryParams[key]);
                    break;
                }

                case availableQueryParams.radius:{
                    let currentUser = req.currentUser;
                    condition[dbMappings.radius]= { $near:{ $geometry: currentUser.loc, $maxDistance:parseInt(queryParams[key]*1000) }}
                    break;
                }

                case availableQueryParams.heightFrom:{
                    condition[dbMappings.heightFrom] = {
                        $gte: parseInt(queryParams[key]),
                        $lte: parseInt(queryParams[availableQueryParams.heightTo]) || config.maxHeight
                    }
                    break;
                }

                    
                default:
                    console.log('default');
                    break;
            }
        })
    }
    return condition;
}

var getUserById = function (req, res, next) {
    let id = req.params.productId;
    getUser(id).then((data) => {
        console.log("added current user data to req object");
        req.currentUser = data;
        next();
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err);
    });
}

var getUser = function (userId) {
    let condition = {};
    if (userId !== null && typeof (userId) !== 'undefined') {
        condition["userId"] = userId
    }
    console.log(condition);
    return MatchesModel.findOne(condition).exec();
}

module.exports = {
    getCurrentUser: getCurrentUser,
    getUserById: getUserById,
    getMatches: getMatches,
    getFilterQuery: getFilterQuery
}