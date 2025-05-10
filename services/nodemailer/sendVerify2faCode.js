const transporter = require("./transporter")
const dotEnv = require("dotenv")
dotEnv.config()

const sendVerify2faCode = (email, code) =>{
    const options = {
        from: `"InterVault Bank" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "2FA Code - InterVault",
        html:`
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>2FA Code - InterVault</title>
    <style>
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
          padding: 20px !important;
        }

        .code-box {
          font-size: 28px !important;
          letter-spacing: 8px !important;
          padding: 15px 20px !important;
        }
      }
    </style>
  </head>

  <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4">
      <tr>
        <td align="center" style="padding: 40px 10px;">
          <table width="500" cellpadding="0" cellspacing="0" border="0" class="container" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.06); padding: 40px 30px; text-align: center;">
            <tr>
              <td align="center" style="padding-bottom: 25px;">
                <img src="https://ucarecdn.com/f82a4e83-f177-4aed-9ac0-94c9657078c1/Intervaultremovebgpreview.png" width="120" alt="InterVault Logo" style="display: block;" />
              </td>
            </tr>
            <tr>
              <td style="font-family: Arial, sans-serif; font-size: 22px; color: #d90429; font-weight: bold; padding-bottom: 10px;">
                Verify Your Login
              </td>
            </tr>
            <tr>
              <td style="font-family: Arial, sans-serif; font-size: 16px; color: #555555; padding-bottom: 30px;">
                Use the 6-digit code below to finish logging into your InterVault account.
              </td>
            </tr>
            <tr>
              <td>
                <table cellpadding="0" cellspacing="0" border="0" align="center">
                  <tr>
                    <td class="code-box" style="background-color: #d90429; color: #ffffff; font-size: 36px; font-weight: bold; letter-spacing: 12px; padding: 20px 40px; border-radius: 10px; font-family: Arial, sans-serif;">
                      ${code}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="font-family: Arial, sans-serif; font-size: 14px; color: #888888; padding-top: 25px; padding-bottom: 20px;">
                This code will expire in 5 minutes. If you did not request it, please ignore this email.
              </td>
            </tr>
            <tr>
                <td align="center" style="padding: 20px; background-color: #f4f4f4; color: #999999; font-size: 12px;">
                  &copy; 2025 InterVault. All rights reserved. <br />
                  <a href="#" style="color: #999999; text-decoration: none;">Privacy Policy</a> | 
                  <a href="#" style="color: #999999; text-decoration: none;">Contact Support</a>
                </td>
              </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

        `
    }
    transporter.sendMail(options)
}

module.exports = sendVerify2faCode