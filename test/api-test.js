const expect = require('chai').expect;
const request = require('request');
const baseURL = "http://localhost:8123"
const currentUserUrl = '/api/user';
var getMacthesUrl = "/api/$userId/matches"

describe("checking user api's", function () {
    var currentUser;
    it("Obtain a user for current session", (done) => {
        request.get(baseURL+currentUserUrl,(err,response,body) => {
            body = JSON.parse(body)
            expect(response.statusCode).to.equal(200);
            expect(body.userId).to.not.equal(null);
            currentUser = body;
            done();
        });
    });

    it("Obtain a user matches", (done) => {
        getMacthesUrl = getMacthesUrl.replace("$userId",currentUser.userId)
        request.get(baseURL+getMacthesUrl,(err,response,body) => {
            body = JSON.parse(body)
            expect(response.statusCode).to.equal(200);
            currentUser = body;
            done();
        });
    });

    it("Obtain a user matches with filter on radius, height and compatiblity", (done) => {
        getMacthesUrl = getMacthesUrl.replace("$userId",currentUser.userId)
        queryParams = {
            radius: 50,
            heightFrom: 163,
            heightTo: 190,
            compatibilityScoreFrom: 19,
            compatibilityScoreTo: 78
        }
        request.get({url:baseURL+getMacthesUrl,qs:queryParams},(err,response,body) => {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});
