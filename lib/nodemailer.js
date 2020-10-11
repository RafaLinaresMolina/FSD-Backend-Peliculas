const nodemailer = require("nodemailer");

const nmailer = {
  transporter: nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }),
  defaultMail(user, url) {
    return {
      to: user.email,
      subject: "Back4Films, Confirm your email ✔",
      html: `
      <h2>Welcome to Back4Films</h2>
      <a href="${url}">Click here to confirme your email</a>
      <span>The link above will expire in 24 hours</span>
      `,
    };
  },
};

module.exports = nmailer;
