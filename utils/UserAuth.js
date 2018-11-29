let Login = require('../modules/RESTlogin');
let hash = require('../lib/salthash');
let jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("577145700233-8jqcdshv8hpektmiiutog3dot4800ju4.apps.googleusercontent.com");


module.exports = {
    login: function(req, res, next) {
        // var hashedPW = hash.saltAndHash(req.body.password);
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
                var token=jwt.sign({user},'my_secret');
                let result = { msg: "Login", links: links, token: token};
                res.set("Authorization", result.token);
                res.cookie('token', token);
                res.status(201).json(result);
            }else{
                let result = { error: data.message};
                res.status(201).json(result);
            }
        };

        Login.userLogin(callback, user, db);
    },

    registration: function(req, res, next) {
        var hashedPW = hash.saltAndHash(req.body.password);
        let user = {
            "email": req.body.email,
            "name": req.body.name,
            "password": hashedPW,
            "status": 0
        };

        let db = req.con;
        console.log(req);
        var callback = function(data) {

            console.log("data:" + data.success);

            if(data.success){
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

    verifyToken: function(req, res, next) {
        console.log(req.body.type);
        jwt.verify(req.body.token, "my_secret", function(err, decoded) {
          if (err) {
            console.log("error");
            res.sendStatus(403);
          } else {
            console.log(decoded);
            let result = {username: decoded.user.email};
            console.log(result.username);
            res.status(201).json(result);
          }
        });
    },

    googleToken: async function(req, res, next) {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: "577145700233-8jqcdshv8hpektmiiutog3dot4800ju4.apps.googleusercontent.com"  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload['email']);
        
        res.status(201).json({"username": payload['email']});
    }
}