const { createTransport } = require("nodemailer");
const dotEnv = require("dotenv");
dotEnv.config();

const transporter = createTransport({
    service: "gmail",
    auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,  // <- add this line to bypass cert validation errors
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
