
const employModel = require('../model/employModel');
const bcrypt = require('bcrypt');

module.exports.encrypt = async (password) => {
    console.log(password);
    const salt = await bcrypt.genSalt(10);
        encrypt_password = await bcrypt.hash(password, salt);
        // console.log(encrypt_password);
    return encrypt_password;
}

