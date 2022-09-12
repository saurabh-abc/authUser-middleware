const mongoose = require('mongoose');
var secretKey = process.env.SECRET_KEY;

var encryptkey = process.env.ENCRYPT_KEY;
var dbHost = process.env.DATABASE_URL

module.exports = {
    secretKey : secretKey,
    encryptkey : encryptkey,
    dburl :  dbHost
}