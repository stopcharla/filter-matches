const expect = require('chai').expect;
const userController = require('../src/controllers/user.controller')

describe("Checking if mongo query for has face provided filters", () => {

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

});