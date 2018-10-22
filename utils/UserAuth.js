let Login = require('../modules/RESTlogin');
let smtpTransport = require('./SMTP');
var userModel = require('../models/userModel');

var rand,mailOptions,host,link;

module.exports = {
    authentication: function(req, res, next) {
        let user = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
        var callback = function(data) {

            if(data.success){
                // req.session.username = user.name;
                res.redirect('/');
            }else{
                res.render('login');
            }
        }

        Login.userLogin(callback, user);
    },
    registration: function(req, res, next) {
        let user = {
            "email": req.body.email,
            "name": req.body.name,
            "password": req.body.password
        };

        var callback = function(data) {

            console.log("data:" + data.success);

            if(data.success){
                // req.session.username = user.name;
                res.redirect('/');
            }else{
                res.render('register');
            }
        };

        Login.userRegister(callback, user);
    },
    sendEmail: function(req, res, next) {
        rand=Math.floor((Math.random() * 100) + 54);
        host=req.get('host');
        link="http://"+req.get('host')+"/users/verify?id="+rand;
        mailOptions={
            to : req.query.to,
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
            console.log(error);
            res.end("error");
          }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
          }
        });
    },
    verifyEmail: function(req, res, next) {
        console.log(req.protocol+":/"+req.get('host'));
        if((req.protocol+"://"+req.get('host'))==("http://"+host))
        {
            console.log("Domain is matched. Information is from Authentic email");
            if(req.query.id==rand)
            {
                console.log("email is verified");
                res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
            }
            else
            {
                console.log("email is not verified");
                res.end("<h1>Bad Request</h1>");
            }
        }
        else
        {
            res.end("<h1>Request is from unknown source");
        }
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
}