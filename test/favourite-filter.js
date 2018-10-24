const expect = require('chai').expect;
const userController = require('../src/controllers/user.controller')

describe("Checking if mongo query for favourite provided filters", () => {

    it("check if is favourite false filter is working", (done) => {
        let req = {
            query: {
                favourite: 0
            }
        };
        let expectedJson = { favourite: false }
        let condition = userController.getFilterQuery(req);
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
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })
    
});