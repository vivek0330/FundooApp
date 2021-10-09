/* eslint-disable no-unused-expressions */
const nodemailer = require("nodemailer");
require("dotenv").config();
const helper = require("./hash&token");
// const { callbackPromises } = require("nodemailer/lib/shared");
const logger = require("../logger/logger");

exports.sendEmail = (data) => {
  const transporter = nodemailer.createTransport({
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
              <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>   
              <p>${token}</p> `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error("err nodemailer :: " + error);
      // console.log(error);
    } else {
      logger.info("Email has been sent, Please kindly follow the steps !!", info.response);
      //  console.log("email has been sent", info.response);
      return info.response;
    }
  });
};
