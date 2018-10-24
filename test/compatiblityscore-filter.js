const expect = require('chai').expect;
const config = require('../src/config/config');
const userController = require('../src/controllers/user.controller');

describe("Checking if mongo query for compaitablity  filters", () => {

    it("check if is compaitablity score filter is working", (done) => {
        let req = {
            query: {
                compatibilityScoreFrom: 19,
                compatibilityScoreTo: 78
            }
        };
        let expectedJson = { compatibility_score: { $gte: req.query.compatibilityScoreFrom, $lte: req.query.compatibilityScoreTo } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if is compaitablity score to range not provided filter is working", (done) => {
        let req = {
            query: {
                compatibilityScoreFrom: 19
            }
        };
        let expectedJson = { compatibility_score: { $gte: req.query.compatibilityScoreFrom, $lte: config.maxCompaitablityScore } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if is compaitablity score to min range not provided filter is working", (done) => {
        let req = {
            query: {
                compatibilityScoreFrom: 0
            }
        };
        let expectedJson = { compatibility_score: { $gte: config.minCompaitablityScore, $lte: config.maxCompaitablityScore } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if is compaitablity score out of bounds range provided filter is working", (done) => {
        let req = {
            query: {
                compatibilityScoreFrom: 0,
                compatibilityScoreTo:200
            }
        };
        let expectedJson = { compatibility_score: { $gte: config.minCompaitablityScore, $lte: config.maxCompaitablityScore } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

});