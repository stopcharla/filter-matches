const MatchesModel = require('../models/matches.model');
const config = require('../config/config');
const utils = require('../utils/utils');

var getCurrentUser = function (req, res) {
    getUser().then((data) => {
        res.json(data);
        return;
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err);
        return;
    });
};

var getMatches = function (req, res) {
    let currentUser = req.currentUser;
    let condition = getFilterQuery(req);

    condition["userId"] = { $ne: currentUser.userId }
    console.log("mongo condition is", condition);
    MatchesModel.find(condition).exec().then((response) => {
        console.log("matches found for user");
        res.json({ matches: response });
        return;
    }).catch((err) => {
        console.error("error occured in getting matches:", err);
        res.status(500).send(err);
        return;
    });
};

var getFilterQuery = function getFilterQuery(req) {
    let queryParams = req.query;
    let condition = {};
    if (queryParams !== null && typeof (queryParams) !== 'undefined') {
        let availableQueryParams = config.queryParameters;
        let dbMappings = config.filterToDbEntryMappings;
        Object.keys(queryParams).forEach((key) => {
            switch (key) {
                case availableQueryParams.ageFrom: {
                    let values = utils.checkRangeValidity(queryParams, availableQueryParams.ageFrom, availableQueryParams.ageTo, config.maxAge, config.minAge);
                    if (values[config.considerQuery] === true) {
                        condition[dbMappings.ageFrom] = {
                            $gte: values[config.valueFrom],
                            $lte: values[config.valueTo]
                        }
                    }
                    break;
                }

                case availableQueryParams.hasFace: {
                    if (parseInt(queryParams[key]) === 0) {
                        condition[dbMappings.hasFace] = { $eq: null };
                    } else if (parseInt(queryParams[key]) === 1) {
                        condition[dbMappings.hasFace] = { $ne: null };
                    }
                    break;
                }

                case availableQueryParams.favourite: {
                    if (!isNaN(queryParams[key])) {
                        let isFavourite = false;
                        if (parseInt(queryParams[key]) === 1) {
                            isFavourite = true;
                        }
                        condition[dbMappings.favourite] = isFavourite;
                    }
                    break;
                }

                case availableQueryParams.compatibilityScoreFrom: {
                    let values = utils.checkRangeValidity(queryParams, availableQueryParams.compatibilityScoreFrom, availableQueryParams.compatibilityScoreTo, config.maxCompaitablityScore, config.minCompaitablityScore);
                    if (values[config.considerQuery] === true) {
                        condition[dbMappings.compatibilityScoreFrom] = {
                            $gte: values[config.valueFrom],
                            $lte: values[config.valueTo]
                        }
                    }
                    break;
                }

                case availableQueryParams.inContact: {
                    condition[dbMappings.inContact] = parseInt(queryParams[key]);
                    break;
                }

                case availableQueryParams.radius: {
                    let values = utils.checkDistanceValidity(queryParams[key],config.minDistance,config.maxDistance);
                    if (values[config.considerQuery] === true) {
                        let currentUser = req.currentUser;
                        condition[dbMappings.radius] = { $near: { $geometry: currentUser.loc, $maxDistance: values[config.valueFrom] * 1000 } }
                    }
                    break;
                }

                case availableQueryParams.heightFrom: {
                    let values = utils.checkRangeValidity(queryParams, availableQueryParams.heightFrom, availableQueryParams.heightTo, config.maxHeight, config.minHeight);
                    if (values[config.considerQuery] === true) {
                        condition[dbMappings.heightFrom] = {
                            $gte: values[config.valueFrom],
                            $lte: values[config.valueTo]
                        }
                    }
                    break;
                }

                default:
                    break;
            }
        })
    }
    return condition;
}

var getUserById = function (req, res, next) {
    let id = req.params.userId;
    getUser(id).then((data) => {
        if (data === null || typeof (data) === 'undefined') {
            res.status(400).send({ message: "user not found" });
            return;
        }
        req.currentUser = data;
        next();
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err);
        return;
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