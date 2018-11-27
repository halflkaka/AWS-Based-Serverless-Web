// var userModel = require('../models/userModel');
// let bcrypt = require('bcrypt');
let notification = require('../middleware/notification');

module.exports = {
    //login
    // userLogin: function(callback, userInfo) {
    //     let data = {
    //         success : null,
    //         message : "",
    //         user : ""
    //     };
    //     let user = userInfo.email;
    //     let password = userInfo.password;

    //     userModel.findOne({email: user}).exec(function(err, User) {
    //         bcrypt.compare(password, User.password, function (err, result) {
    //             if (result === true) {
    //                 data.success = true;
    //                 data.user = User.name;
    //                 data.message = "Welcome " + userInfo.name + " .";
    //             } else {
    //                 data.success = false;
    //                 data.message = "Authentication failed";
    //             }
    //             callback(data);
    //         });
    //     });
    // },

    userLogin: function(callback, userInfo, db){
        let data = {
            success : null,
            message : "",
            id : userInfo.email
        };

        db.query(
            {
                sql: 'SELECT * FROM users WHERE email = ? and password = ? and status = 1', 
                values: [userInfo.email, userInfo.password],
                timeout: 40000,
            },
            function(err, rows){
                if (rows){
                    data.success = true;
                    data.message = 'Login succeed';
                } else{
                    console.log("Error! No exist user!");
                    data.success = false;
                    data.message = 'Login failed';
                }
                callback(data);
            }
        );
    },

    userRegister: function(callback, userInfo, db) {
        let data = {
            success : null,
            message : "",
            id : userInfo.email
        };
        
        console.log(userInfo);
        db.query("INSERT INTO users SET ?", userInfo, function(err, rows) {
            if (err) {
                console.log("error");
                data.success = false;
                data.message = "Register failed";
            } else {
                data.success = true;
                data.message = "Register succeed";
            }
            notification.registrationNotification(userInfo);
            callback(data);
        });
    },

    userAuthenticate: function(callback, userInfo, db) {
        let data = {
            success : null,
            message : "",
            id : userInfo.email
        };

        console.log(userInfo);
        db.query("UPDATE users SET status = 1 WHERE email = ?", userInfo.email, function(err, rows) {
            if (err) {
                console.log("error");
                data.success = false;
                data.message = "Authentication failed";
            } else {
                rows.status = 1;
                data.success = true;
                data.message = "Authentication succeed";
            }
            callback(data);
        });
    }
 }