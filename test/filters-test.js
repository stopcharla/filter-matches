const expect = require('chai').expect;
const config = require('../src/config/config')
const userController = require('../src/controllers/user.controller')

describe("Checking if mongo query for various provided filters", () => {

    it("check if  distance, height and compatiblity score filters are working", (done) => {
        let req = {
            query: {
                radius: 50,
                heightFrom: 163,
                heightTo: 190,
                compatibilityScoreFrom: 19,
                compatibilityScoreTo: 78
            },
            currentUser: {
                loc: { "type": "Point", "coordinates": [-0.118092, 51.509865] }
            }
        };
        let expectedJson = {
            loc: { $near: { $geometry: req.currentUser.loc, $maxDistance: req.query.radius * 1000 } },
            height_in_cm: { $gte: req.query.heightFrom, $lte: req.query.heightTo },
            compatibility_score: { $gte: req.query.compatibilityScoreFrom, $lte: req.query.compatibilityScoreTo }
        }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if  distance is passes as string, height and compatiblity score filters are working", (done) => {
        let req = {
            query: {
                radius: "abc",
                heightFrom: "cde",
                heightTo: 190,
                compatibilityScoreFrom: 19,
                compatibilityScoreTo: 78
            },
            currentUser: {
                loc: { "type": "Point", "coordinates": [-0.118092, 51.509865] }
            }
        };
        let expectedJson = {
            compatibility_score: { $gte: req.query.compatibilityScoreFrom, $lte: req.query.compatibilityScoreTo }
        }

        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if  distance is passes as string, height and compatiblity score filters are working", (done) => {
        let req = {
            query: {
                radius: "abc",
                heightFrom: "cde",
                heightTo: 190,
                compatibilityScoreFrom: "cde",
                compatibilityScoreTo: 78,
                hasFace: "poi",
                ageFrom: 18
            },
            currentUser: {
                loc: { "type": "Point", "coordinates": [-0.118092, 51.509865] }
            }
        };
        let expectedJson = {
            age: { $gte: 18, $lte: 95 }
        }

        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if  distance is passes as string, height and compatiblity score filters are working", (done) => {
        let req = {
            query: {
                radius: "abc",
                heightFrom: "cde",
                heightTo: 190,
                compatibilityScoreFrom: "cde",
                compatibilityScoreTo: 78,
                hasFace: "poi",
                ageFrom: 18
            },
            currentUser: {
                loc: { "type": "Point", "coordinates": [-0.118092, 51.509865] }
            }
        };
        let expectedJson = {
            age: { $gte: 18, $lte: 95 }
        }

        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if  inavlid range filters are working", (done) => {
        let req = {
            query: {
                radius: "abc",
                heightFrom: 210,
                heightTo: 190,
                compatibilityScoreFrom: "cde",
                compatibilityScoreTo: 78,
                hasFace: "poi",
                ageFrom: 18
            },
            currentUser: {
                loc: { "type": "Point", "coordinates": [-0.118092, 51.509865] }
            }
        };
        let expectedJson = {
            age: { $gte: 18, $lte: 95 }
        }

        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if  distance, height and compatiblity score filters are working", (done) => {
        let req = {
            query: {
                radius: 20,
                heightFrom: 100,
                heightTo: 190,
                compatibilityScoreFrom: 0,
                compatibilityScoreTo: 78
            },
            currentUser: {
                loc: { "type": "Point", "coordinates": [-0.118092, 51.509865] }
            }
        };
        let expectedJson = {
            loc: { $near: { $geometry: req.currentUser.loc, $maxDistance: config.minDistance * 1000 } },
            height_in_cm: { $gte: config.minHeight, $lte: req.query.heightTo },
            compatibility_score: { $gte: config.minCompaitablityScore, $lte: req.query.compatibilityScoreTo }
        }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

})