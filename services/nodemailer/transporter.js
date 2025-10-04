const { createTransport } = require("nodemailer");
require("dotenv").config();

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465, // or 587 if you want TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.APP_EMAIL,     // your Gmail address
    pass: process.env.APP_PASSWORD,  // Gmail App Password (not normal password!)
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Error connecting to SMTP:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports = transporter;
