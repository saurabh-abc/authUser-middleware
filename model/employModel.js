const mongoose = require('mongoose');
const usersCreate = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    adress: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    jwt_token: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    cpassword: {
        type: String,
    }
})
module.exports = mongoose.model('employModel', usersCreate)