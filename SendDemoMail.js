// //import * as nodemailer from "nodemailer";
// var nodemailer = require("./node_modules/nodemailer");
// var AllTestResultLog = require("./tests/NewWebUIFlowTesting.spec");

// async function sendEmail() 
// {
//   const now = new Date();
//   const date = now.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });
//   const transporter = nodemailer.createTransport
//   ({
    // host: "smtp.office365.com",
    // port: 587,
    // secure: false,
    // auth: 
    // {
    //   user: "donotreply@authparency.com",
    //   pass: "Pramukh@1",
    // },
//   });

//   const mailOptions = 
//   {
    // from: "donotreply@authparency.com",
    // to: "tushar.galiya@outamation.com, kaushal.dholariya@outamation.com",
    // subject: "PAUAT URL testing update: " + date,
    // html: `<html>
    //   <head>
        // <style>
        //   table 
        //   {
            // font-family: arial, sans-serif;
            // width: 100%;
            // border-collapse: collapse;
        //   }
        //   td, th 
        //   {
            // border: 1px solid #000000;
            // text-align: center;
            // padding: 5px;
        //   }
        //   th 
        //   {
            // text-align: left;
            // padding: 12px;
        //   }
        // </style>
    //   </head>
    //   <body>
        // <div>Hi All,<br><br>Here are the testing results of all the available modules of Pauat URL (pauat.mstc.company).</div>
        // <table>
        //   <tr>
            // <th>Sr No</th>
            // <th>Module</th>
            // <th>Status</th>
        //   </tr>
        //   ${getTestResults()}
        // </table>
        // <br><br>
        // <div>Thanks,<br>Tushar & Kaushal</div>
    //   </body>
    // </html>`,
//   };

//   try 
//   {
    // await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully.");
//   } catch (error) 
//   {
    // console.error("Error sending email:", error);
//   }
// }

// function getTestResults() 
// {
//   let test = "";
//   //AllTestResultLog.sort((a, b) => a.SrNo - b.SrNo);
//   AllTestResultLog.sort();
//   for (const result of AllTestResultLog) {
    // const rowColor = result.Status === "Fail" ? "style='color: red'" : "";
    // test += `<tr ${rowColor}><td>${result.SrNo}</td><td>${result.Module}</td><td>${result.Status}</td></tr>`;
//   }
//   return test;
// }

// sendEmail();
