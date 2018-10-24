const expect = require('chai').expect;

var mongoose = require('mongoose');
// const user = require('../src/controllers/user.controller');

before(function (done) {
    mongoose.connect('mongodb://localhost:27017/sparkDatabase', function (err) {
        done(err);
    });
});

after((done) =>{
    mongoose.disconnect((err)=>{
        done(err)
    })
})

describe("Obtaining current user and corresponding matches", () => {
    var matchModel = require('../src/models/matches.model');
    var currentUser,totalUsers;

    it("count total users",(done)=>{
        matchModel.count({}, function( err, count){
            console.log( "Number of users:", count );
            expect(count).to.greaterThan(0);
            totalUsers = count;
            done();
        });
    })

    it("Obtain a user", (done) => {
        matchModel.findOne({}, (err, res) => {
            expect(res.userId).to.not.equal(null);
            currentUser=res;
            done();
        })
    })

    it("Obtain matches for user without filters",(done) => {
        matchModel.find({userId:{$ne:currentUser.userId}},(err,res) => {
            expect(res.length).to.equal(totalUsers - 1);
            done();
        });
    })

    it('Obtain matches whith no profile image and age is 45',(done) => {
        matchModel.find({userId:{$ne:currentUser.userId},main_photo:null,age:45},(err,res) => {
            done();
        });
    })

});