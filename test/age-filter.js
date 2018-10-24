const expect = require('chai').expect;
const config = require('../src/config/config')
const userController = require('../src/controllers/user.controller')

describe("Checking if mongo query for age filters", () => {

    it("check if age filter is working", (done) => {
        let req = {
            query: {
                ageFrom: 38,
                ageTo: 45
            }
        };
        let expectedJson = { age: { $gte: req.query.ageFrom, $lte: req.query.ageTo } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if out of range age filter is working", (done) => {
        let req = {
            query: {
                ageFrom: 12,
                ageTo: 105
            }
        };
        let expectedJson = { age: { $gte: config.minAge, $lte: config.maxAge } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if out of range age filter is working", (done) => {
        let req = {
            query: {
                ageFrom: 12,
                ageTo: 90
            }
        };
        let expectedJson = { age: { $gte: config.minAge, $lte: req.query.ageTo } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if age NaN filter is working", (done) => {
        let req = {
            query: {
                ageFrom: "abc",
                ageTo: 90
            }
        };
        let expectedJson = {}
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if age filter not providing max age is working", (done) => {
        let req = {
            query: {
                ageFrom: 38,
            }
        };
        let expectedJson = { age: { $gte: req.query.ageFrom, $lte: config.maxAge } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

});