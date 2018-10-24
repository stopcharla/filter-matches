const expect = require('chai').expect;
const config = require('../src/config/config')
const userController = require('../src/controllers/user.controller')

describe("Checking if mongo query for all provided filters", () => {
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

    it("check if has face true filter is working", (done) => {
        let req = {
            query: {
                hasFace: 1
            }
        };
        let expectedJson = { main_photo: { $ne: null } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if has face false filter is working", (done) => {
        let req = {
            query: {
                hasFace: 0
            }
        };
        let expectedJson = { main_photo: { $eq: null } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if has face false filter is working", (done) => {
        let req = {
            query: {
                hasFace: 0
            }
        };
        let expectedJson = { main_photo: { $eq: null } }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if is favourite false filter is working", (done) => {
        let req = {
            query: {
                favourite: 0
            }
        };
        let expectedJson = { favourite: false }
        console.log("expected json:", expectedJson);
        let condition = userController.getFilterQuery(req);
        console.log("got:", condition);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if is favourite true filter is working", (done) => {
        let req = {
            query: {
                favourite: 1
            }
        };
        let expectedJson = { favourite: true }
        console.log("expected json:", expectedJson);
        let condition = userController.getFilterQuery(req);
        console.log("got:", condition);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

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

    it("check if is contacts exchanged true filter is working", (done) => {
        let req = {
            query: {
                inContact: 1
            }
        };
        let expectedJson = { contacts_exchanged: 1 }
        console.log("expected json:", expectedJson);
        let condition = userController.getFilterQuery(req);
        console.log("got:", condition);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if is contacts exchanged false filter is working", (done) => {
        let req = {
            query: {
                inContact: 24
            }
        };
        let expectedJson = { contacts_exchanged: 24 }
        console.log("expected json:", expectedJson);
        let condition = userController.getFilterQuery(req);
        console.log("got:", condition);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

    it("check if  height range filter is working", (done) => {
        let req = {
            query: {
                heightFrom: 163,
                heightTo: 190
            }
        };
        let expectedJson = { height_in_cm: { $gte: req.query.heightFrom, $lte: req.query.heightTo } }
        console.log("expected json:", expectedJson);
        let condition = userController.getFilterQuery(req);
        console.log("got:", condition);
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
        console.log("expected json:", expectedJson);
        let condition = userController.getFilterQuery(req);
        console.log("got:", condition);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

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
        console.log("expected json:", expectedJson);
        let condition = userController.getFilterQuery(req);
        console.log("got:", condition);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

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
        console.log("expected json:", expectedJson);
        let condition = userController.getFilterQuery(req);
        console.log("got:", condition);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })
})