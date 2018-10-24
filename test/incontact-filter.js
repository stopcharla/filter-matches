
const expect = require('chai').expect;
const config = require('../src/config/config');
const userController = require('../src/controllers/user.controller');

describe("Checking if mongo query for incontact  filters", () => {

    it("check if is contacts exchanged  filter1 is working", (done) => {
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

    it("check if is contacts exchanged filter2 is working", (done) => {
        let req = {
            query: {
                inContact: 24
            }
        };
        let expectedJson = { contacts_exchanged: 24 }
        let condition = userController.getFilterQuery(req);
        expect(condition).to.deep.equal(expectedJson);
        done();
    })

});