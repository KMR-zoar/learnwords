const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./words.sqlite');

module.exports = db;
