"use strict";

module.exports = function (app) {
    var user = require('../controllers/user.controller');

    app.route('/api/user')
        .get(user.getCurrentUser)
};