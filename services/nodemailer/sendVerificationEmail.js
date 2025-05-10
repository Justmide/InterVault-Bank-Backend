const transporter = require("./transporter")
const dotEnv = require("dotenv")
dotEnv.config()

const sendVerificationEmail = (email, firstName, token) =>{
  if (!email) {
    console.error("❌ No recipient email provided");
    return;
  }

  const options = {
    from: `"InterVault Bank" <${process.env.EMAIL_USER}>`, 
    to: email,
    subject: "Verify Your Account",
    html: `
 <!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Account</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      @media only screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
          padding: 20px !important;
        }

        .email-body {
          padding: 20px !important;
        }

        .button {
          width: 100% !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f8fa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f8fa;">
      <tr>
        <td align="center">
          <table class="email-container" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; margin-top: 30px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <tr>
              <td align="center" style="padding: 30px 0; background-color: #ffffff;">
                <img src="https://ucarecdn.com/f82a4e83-f177-4aed-9ac0-94c9657078c1/Intervaultremovebgpreview.png" alt="InterVault" style="max-width: 180px;" />
              </td>
            </tr>

            <tr>
              <td class="email-body" style="padding: 40px 50px; background-color: #ffffff;">
                <h4 style="color: #b71c1c; margin-top: 0;">Action Required: Verify Your Email</h4>
                <p style="color: #333333; font-size: 16px; line-height: 2;">
                  Dear <strong>${firstName}</strong>,
                </p>
                <p style="color: #333333; font-size: 15px; line-height: 2;">
                  Thank you for choosing <strong>InterVault</strong>. To complete your registration and activate your online banking profile, please verify your email address by clicking the button below.
                </p>

                <table cellpadding="0" cellspacing="0" width="50%" style="margin: 30px 0;">
                  <tr>
                    <td align="center">
                      <a href="${process.env.client_domain}/verify/${token}" class="button" style="background-color: #b71c1c; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; font-size: 16px;">
                        Verify My Account
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="color: #333333; font-size: 14px; line-height: 1.5;">
                  If you did not request this account, please ignore this email or contact our support immediately.
                </p>

                <!-- Fraud Warning -->
                <div style="margin-top: 30px; padding: 15px; border-top: 1px solid #e0e0e0;">
                  <p style="color: #b71c1c; font-size: 13px; font-weight: bold; margin-bottom: 5px;">⚠️ Beware of Fraud</p>
                  <p style="color: #555555; font-size: 13px; line-height: 1.5;">
                    InterVault Bank will never ask for your password, OTP, or full card details via email, phone call, or SMS. Always verify sources before clicking links or sharing personal information.
                  </p>
                </div>
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

module.exports = sendVerificationEmail