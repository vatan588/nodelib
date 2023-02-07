var path = require("path");
var url = "mongodb+srv://vatan:123456Admin@cluster0.zdzky.mongodb.net/v1?retryWrites=true&w=majority";
var database = "v1"
const assert = require("assert");
const client = require("mongodb").MongoClient;
var mongoose = require('mongoose');
let _db;

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    mongoose.set('strictQuery', false);
    mongoose.connect(url + database, connected);
    function connected(err, db) {
        if (err) {
            console.log("DB initialized error: " + err);
            return callback(err);
        }
        console.log("DB initialized - connected to: " + url);
        _db = db;

        return callback(null, _db);
    }
}

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

module.exports = {
    getDb,
    initDb
};
