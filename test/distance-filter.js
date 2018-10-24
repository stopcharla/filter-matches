const expect = require('chai').expect;
const config = require('../src/config/config');
const userController = require('../src/controllers/user.controller');

describe("Checking if mongo query for distance provided filters", () => {

    it("check if  distance filter is working", (done) => {
        let req = {
            query: {
                radius: 50
            },
            currentUser: {
                loc: { "type": "Point", "coordinates": [-0.118092, 51.509865] }
            }
        };
        let expectedJson = { loc: { $near: { $geometry: req.currentUser.loc, $maxDistance: req.query.radius * 1000 } } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if  distance filter for min value is working", (done) => {
        let req = {
            query: {
                radius: 0
            },
            currentUser: {
                loc: { "type": "Point", "coordinates": [-0.118092, 51.509865] }
            }
        };
        let expectedJson = { loc: { $near: { $geometry: req.currentUser.loc, $maxDistance: config.minDistance * 1000 } } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if  distance filter for min value is working", (done) => {
        let req = {
            query: {
                radius: 400
            },
            currentUser: {
                loc: { "type": "Point", "coordinates": [-0.118092, 51.509865] }
            }
        };
        let expectedJson = { loc: { $near: { $geometry: req.currentUser.loc, $maxDistance: config.maxDistance * 1000 } } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })
    
});