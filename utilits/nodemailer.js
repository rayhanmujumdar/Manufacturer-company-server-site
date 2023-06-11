// const SibApiV3Sdk = require("sib-api-v3-sdk");
const nodemailer = require("nodemailer");

const nodemailerTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_EMAIL_HOST, // e.g., smtp.brevo.com
    port: process.env.BREVO_EMAIL_PORT, // or the appropriate port number provided by Brevo
    auth: {
      user: process.env.BREVO_EMAIL_USER, // your Brevo account email
      pass: process.env.BREVO_EMAIL_PASS, // your Brevo account password
    },
  });
  return transporter;
};

module.exports = nodemailerTransporter;
