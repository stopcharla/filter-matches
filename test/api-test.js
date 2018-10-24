const expect = require('chai').expect;
const request = require('request');
const currentUserUrl = 'http://localhost:8123/api/user';

describe("checking user api's", function () {
    it("Obtain a user for current session", (done) => {

        request.get(currentUserUrl,(err,response,body) => {
            console.log(body)
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});