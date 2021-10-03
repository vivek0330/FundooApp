/* eslint-disable no-unused-expressions */
const nodemailer = require("nodemailer");
require("dotenv").config();
const helper = require("../helpers/hash&token");
// const logger = require("../logger/logger");

exports.sendEmail = (data) => {
  const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,
    // requireTLS: true,
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Password
    }
  });

  const token = helper.token(data);
  const mailOptions = {
    from: process.env.Email,
    to: data.email,
    subject: "Password change link",
    text: "thanx for connecting",
    html: `
              <h2>please click on the link to change password</h2>
              <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email has been sent", info.response);
      return info.response;
    }
  });
};
