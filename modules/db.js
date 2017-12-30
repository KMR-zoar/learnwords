var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./words.sqlite');

module.exports = db;
