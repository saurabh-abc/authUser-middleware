const helper = {};
var d = new Date();

helper.response = function (response, status_code, message, data) {
    var ret = {
        responseCode: status_code,
        responseMessage: message,
    };
    if (data) {
        Object.assign(ret, data);
    }
    response.status(status_code).json(ret);
};
module.exports = helper;