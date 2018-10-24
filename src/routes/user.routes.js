"use strict";

module.exports = function (app) {
    var user = require('../controllers/user.controller');

    app.route('/api/user')
        .get(user.getCurrentUser)

    app.route('/api/:userId/matches')
        .get(user.getMatches)

    app.param('userId', user.getUserById);
};