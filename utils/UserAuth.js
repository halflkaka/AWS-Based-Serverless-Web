let Login = require('../modules/RESTlogin');

var rand,mailOptions,host,link;

module.exports = {
    login: function(req, res, next) {
        let user = {
            email: req.body.email,
            password: req.body.password,
        };

        let db = req.con;

        var callback = function(data){
            console.log("data:" + data.success);

            if(data.success){
                // req.session.username = user.name;
                data.resource="customers";
                let url = "/" + data.resource + "/" + data.id;
                let links = [];
                links.push({rel: "self", href: url});
                let result = { msg: "Login", links: links };
                console.log(url);
                res.status(201).json(result);
            }else{
                res.status(500).json("Why is it always me?");
            }
        };

        Login.userLogin(callback, user, db);
    },

    registration: function(req, res, next) {
        let user = {
            "email": req.body.email,
            "name": req.body.name,
            "password": req.body.password,
            "status": 0
        };

        let db = req.con;
        console.log(req);
        var callback = function(data) {

            console.log("data:" + data.success);

            if(data.success){
                // req.session.username = user.name;
                data.resource="customers";
                let url = "/" + data.resource + "/" + data.id;
                let links = [];
                links.push({rel: "self", href: url});
                let result = { msg: "Created", links: links };
                console.log(url);
                res.status(201).json(result);
            }else{
                res.status(500).json("Why is it always me?");
            }
        };

        Login.userRegister(callback, user, db);
    },

    authentication: function(req, res, next) {
        let user = {
            "email" : req.body.email
        };

        let db = req.con;

        var callback = function(data) {
            console.log("data:" + data.success);

            if(data.success){
                // req.session.username = user.name;
                data.resource="customers";
                let url = "/" + data.resource + "/" + data.id;
                let links = [];
                links.push({rel: "self", href: url});
                let result = { msg: "Authenticated", links: links };
                console.log(url);
                res.status(201).json(result);
            }else{
                res.status(500).json("Why is it always me?");
            }
        };
        Login.userAuthenticate(callback, user, db);
    },

    checkSession: function(req, res, next){

        var sess = req.session;

        if (sess.hasOwnProperty('username')){
            next();
        }
        else{
            res.render('login', { title: 'Login', success: false, msg: "Please login first!" });
        }
    },
    logOut: function(req, res, next) {
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
              if(err) {
                return next(err);
              } else {
                return res.redirect('/');
              }
            });
        }
        
    }
}