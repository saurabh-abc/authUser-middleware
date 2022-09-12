const employModel = require('../model/employModel');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const multer = require('multer')
const { encrypt } = require('../helper/common_helper');
require('dotenv').config();
const secret = process.env.SECRET_KEY;
const authmiddleware = require('../middleware/auth_handler');
const helper = require('../config/helper');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now());
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1000000
//     }
// }).single('userfile');

var userApis = {
    "user": async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var ress = { errors: errors.array() }
            return helper.response(res, 400, "Parameter is missing");
        } if (!req.body.email) {
            return helper.response(res, 400, "email is required");
        }
        else if (!req.body.adress) {
            return helper.response(res, 400, "city is required");
        }
        else if (!req.body.gender) {
            return helper.response(res, 400, "gender is required");
        }
        else if (!req.body.age) {
            return helper.response(res, 400, "age is mandatory");
        }
        else if (!req.body.password) {
            return helper.response(res, 400, "password is mandatory");
        }
        else {

            if (req.body.password == req.body.cpassword) {
                employModel.findOne({ email: req.body.email }, async (err, result) => {
                    if (err) {
                        return helper.response(res, 400, "something went wrong while fetching");
                    }
                    else if (result) {
                        return helper.response(res, 400, "Email is already exist");
                    }
                    else {
                        var encypted_password = await encrypt(req.body.password);
                        // console.log(encypted_password);
                        // return;
                        const userObject = {
                            email: req.body.email,
                            adress: req.body.adress,
                            gender: req.body.gender,
                            age: req.body.age,
                            password: encypted_password
                        };
                        let users = new employModel(userObject);
                        users.save((err, result) => {
                            if (err) {
                                console.log(err.message);
                                return helper.response(res, 400, "something went wrong while registering");
                            } else {
                                console.log("result", result)
                                return helper.response(res, 200, "user created successFully");
                            }
                        })
                    }
                })
            }
        }
    },

    "login": async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var ress = { errors: errors.array() }
            return helper.response(res, 400, "Parameter is missing");
        }
        if (!req.body.email) {
            return helper.response(res, 400, "email is required");
        }
        else if (!req.body.password) {
            return helper.response(res, 400, "password is required");
        }
        else {
            employModel.findOne({ email: req.body.email }, async (err, res) => {
                if (err) {
                    console.log(err.message);
                    return helper.response(res, 400, "User not found");
                } else {
                    if (!res.email == req.body.email) {
                        return helper.response(res, 400, "User not Exist Please SignUp First");
                    }
                    else {
                        bcrypt.compare(req.body.password, res.password, function (err, results) {
                            if (err) {
                                return helper.response(res, 400, "something went wrong");
                            }
                            if (results) {
                                var token_data = {
                                    _id: res._id
                                }
                                var token = jwt.sign(token_data, secret, { expiresIn: '1d' });
                                res.jwt_token = token;
                                employModel.findOneAndUpdate({ _id: res._id }, { $set: { jwt_token: token } }, { new: true }).exec(function (err, newResult) {
                                    if (err) {
                                        return helper.response(res, 400, "something went wrong");
                                    } else {
                                        var newResult1 = JSON.parse(JSON.stringify(newResult));
                                        var ress = { result: newResult1 }
                                        console.log('user_loggedIn');
                                    }
                                })
                            } else {
                                console.log('invalid credential');
                            }
                        })
                    }
                }
            })
        }
    },

    "home": async (req, res) => {

        console.log(req.files);


    }

}
module.exports = userApis;