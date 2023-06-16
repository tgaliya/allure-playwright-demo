//require('dotenv').config();
const nodemailer = require('./node_modules/nodemailer');

function sendEmail(): Promise<string> {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var formattedDate = day + '/' + month + '/' + year;

  var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    requireTLS: true,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: 'donotreply@authparency.com',
      pass: 'Pramukh@1',
    },
    logger: true,
    debug: true
  });

  var mailOptions = {
    from: 'donotreply@authparency.com',
    to: 'tushar.galiya@outamation.com',
    subject: 'Playwright Automation Result: ' + formattedDate,
    html: `<html>
        <head>
          <style>
            table 
            {
              font-family: arial, sans-serif;
              width: 40%;
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
              text-align: center;
              padding: 12px;
            }
          </style>
        </head>
        <body>
          <div>Hi All,<br><br>Here are the testing results of all the available modules of VIA URL (https://qa-via.outamationlabs.com/via-ui).</div>
          <br>
          <table>
            <tr>
              <th>Sr No</th>
              <th>Module</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Login</td>
              <td>Pass</td>
            </tr>
          </table>
          <br>
          <div>Thanks,<br>Tushar</div>
        </body>
      </html>`,
  };

  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        reject('SEND EMAIL FAILURE');
      } else {
        console.log(info);
        resolve('SEND EMAIL SUCCESS');
      }
    });
  }); 
}

export {sendEmail}