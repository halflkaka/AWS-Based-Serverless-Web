var userModel = require('../models/userModel');

module.exports = {
    //login
    userLogin: function(callback, userInfo) {
        let data = {
            success : null,
            message : ""
        };
        let user = userInfo.email;
        let password = userInfo.password;

        userModel.findOne({email: user}).exec(function(err, User) {
            if (User.password === password) {
                data.success = true;
                data.message = "Welcome " + userInfo.name + " .";
            } else {
                data.success = false;
                data.message = "Authentication failed";
            }
            callback(data);
        });
    },

    userRegister: function(callback, userInfo) {
        let data = {
            success : null,
            message : ""
        };
        
        userModel.create(userInfo, function(err) {
            if (err) {
                console.log("err");
                data.success = false;
                data.message = "Register failed";
            } else {
                data.success = true;
                data.message = "Register succeed";
            }
            callback(data);
        });
    }
 }