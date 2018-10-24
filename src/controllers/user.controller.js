const MatchesModel = require('../models/matches.model');


var getCurrentUser = function (req, res) {
    getUser().then((data) => {
        res.json(data);
    }).catch((err)=> {
        console.error(err);
        res.status(500).send(err);
    });
};

var getUser = function (userId){
    let condition = {};
    if(userId !== null && typeof(userId) !== 'undefined'){
        condition["userId"] = userId
    }
    console.log(condition);
    return MatchesModel.findOne(condition).exec();
}

module.exports = {
    getCurrentUser: getCurrentUser,
}