//var nodemailer = require("nodemailer");
var nodemailer = require("./node_modules/nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  requireTLS: true,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: 'donotreply@authparency.com',
    pass: 'Pramukh@1'
  },
  logger: true,
  debug: true
});

var mailOptions = {
  from: 'donotreply@authparency.com',
  to: 'tushar.galiya@outamation.com',
  subject: 'Node Mailer',
  text: 'Hello! This is a sample email.' // Plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});
