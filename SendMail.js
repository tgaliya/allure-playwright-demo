require('./node_modules/dotenv').config();
var nodemailer = require("./node_modules/nodemailer");
const AllTestResultLog = require('./testResults');

var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
var formattedDate = day + '/' + month + '/' + year;

module.exports.sendMail = function() 
{
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
    subject: "Web UI Playwright Automation Flow Result: " + formattedDate,
    html: `<html>
        <head>
          <style>
            table 
            {
              font-family: arial, sans-serif;
              width: 100%;
              border-collapse: collapse;
            }
            td, th 
            {
              border: 1px solid #000000;
              text-align: center;
              padding: 5px;
            }
            th 
            {
              text-align: left;
              padding: 12px;
            }
          </style>
        </head>
        <body>
          <div>Hi All,<br><br>Here are the testing results of all the available modules of VIA URL (https://qa-via.outamationlabs.com/via-ui).</div>
          <table>
            <tr>
              <th>Sr No</th>
              <th>Module</th>
              <th>Status</th>
            </tr>
            ${getTestResults(AllTestResultLog)}
          </table>
          <br><br>
          <div>Thanks,<br>Tushar</div>
        </body>
      </html>`,
  };
  
  transporter.sendMail(mailOptions, function (err, info) 
  {
    if (err) 
    {
      console.log(err);
    } 
    else 
    {
      console.log(info);
    }
  });
  }
  
  function getTestResults(AllTestResultLog) 
  {
    let test = "";
    AllTestResultLog.sort();
    for (const result of AllTestResultLog) 
    {
      const rowColor = result.Status === "Fail" ? "style='color: red'" : "";
      test += `<tr ${rowColor}><td>${result.SrNo}</td><td>${result.Module}</td><td>${result.Status}</td></tr>`;
    }
    console.log(test);
    return test;
  }