const mongoClient = require('mongodb').MongoClient;
var uniqid = require('uniqid');
const mongoDbURl = "mongodb://localhost:27017";
const dbName = 'sparkDatabase';
const matchesCollectionName = "matches";

var dbInstance;

function connectMongo() {
    mongoClient.connect(mongoDbURl,{ useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log("error occurred in mongo connect:", err);
        } else {
            console.log("connected to db");
            dbInstance = client.db(dbName);
            insertMatches(matchesCollectionName);
        }
    });
}

function insertMatches(collectionName){
    let jsonData = require('./matches.json');
    let matches = jsonData.matches;
    let promises = [];
    const collection = dbInstance.collection(collectionName);
    matches.forEach((match) => {
        promises.push(insertMatchToDb(match,collection));
    });
    Promise.all(promises).then(() => {
        console.log("successfully inserted all matches to db");
        collection.ensureIndex({loc:"2dsphere"},(err,res)=>{
            if(err){
                console.log("error occurred while creating index for location");
            }else{
                console.log("successfully created index for location");
            }
            process.exit();
        });
    }).catch((err) => {
        console.log("error occured while inserting matches to db");
        process.exit();
    });
}

function insertMatchToDb(match,collection){
    return new Promise((resolve,reject) => {
        match.userId = uniqid();
        let city = match.city;
        match.city = city.name;
        match.compatibility_score = match.compatibility_score*100;
        let location = {type:"Point",coordinates:[city.lon,city.lat]};
        match.loc = location;
        collection.insertOne(match,(err,res) => {
            if(err){
                reject()
            }else{
                resolve()
            }
        });
    });
}

connectMongo();


