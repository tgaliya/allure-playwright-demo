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
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true,
  debug: true
});

var mailOptions = {
  from: process.env.EMAIL_USERNAME,
  to: 'tushar.galiya@outamation.com',
  subject: 'Playwright Automation Result',
  text: 'The Playwright automation script passed successfully.' // Plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});
