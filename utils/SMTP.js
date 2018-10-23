var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'change.majors@gmail.com',
        pass: '20180000'
    }
});

module.exports = smtpTransport;