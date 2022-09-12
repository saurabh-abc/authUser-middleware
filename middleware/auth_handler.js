const jwt = require("jsonwebtoken");
const helper = require('../config/helper');
const employModel = require('../model/employModel');
require('dotenv').config();
const secret = process.env.SECRET_KEY;
const mongoose = require('mongoose');
module.exports.authUser = (req, res, next) => {
    const tokens = req.get("Authorization");
    // console.log(tokens);
    let decoded = jwt.verify(tokens, secret);
    const result = decoded._id;
    // console.log(result);
    employModel.findOne({ _id: result }, function (err, userResult) {
        if (err) {
            console.log(err);
            return helper.response(res, 400, "internal server error");
        } else if (!userResult) {
            return helper.response(res, 400, "authentication error");
        }
        else {
            if (userResult.jwt_token != tokens) {
                return helper.response(res, 400, "something went wrong");
            } else {
                next();
            }
        }
    })
}