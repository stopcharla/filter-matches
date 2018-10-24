const expect = require('chai').expect;
const config = require('../src/config/config');
const userController = require('../src/controllers/user.controller');

describe("Checking if mongo query for height provided filters", () => {

    it("check if  height range filter is working", (done) => {
        let req = {
            query: {
                heightFrom: 163,
                heightTo: 190
            }
        };
        let expectedJson = { height_in_cm: { $gte: req.query.heightFrom, $lte: req.query.heightTo } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if  height not providing to range filter is working", (done) => {
        let req = {
            query: {
                heightFrom: 163
            }
        };
        let expectedJson = { height_in_cm: { $gte: req.query.heightFrom, $lte: config.maxHeight } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if  height not providing to range filter is working", (done) => {
        let req = {
            query: {
                heightFrom: 100
            }
        };
        let expectedJson = { height_in_cm: { $gte: config.minHeight, $lte: config.maxHeight } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if  height range filter is working", (done) => {
        let req = {
            query: {
                heightFrom: 100,
                heightTo: 300
            }
        };
        let expectedJson = { height_in_cm: { $gte: config.minHeight, $lte: config.maxHeight } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

});