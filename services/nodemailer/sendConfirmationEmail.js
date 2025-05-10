const transporter = require('./transporter')
const dotEnv = require("dotenv")
dotEnv.config()

const sendConfirmationEmail = (email) =>{
    const options = {
        sender: "InterVault Bank",
        to: email,
        from: "InterVault Bank: mail com",
        subject: "Account Verified",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Verified - Intervault</title>
</head>
<body style="background-color: #f7f7f7; color: #333; font-size: 16px; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
        <!-- Header Section -->
        <tr>
            <td style="background-color: #ffffff; padding: 20px; text-align: center;">
                <img src="https://ucarecdn.com/f82a4e83-f177-4aed-9ac0-94c9657078c1/Intervaultremovebgpreview.png" alt="Intervault Logo" style="width: 180px;">
            </td>
        </tr>

        <!-- Body Section -->
        <tr>
            <td style="padding: 20px; text-align: center;">
                <h2 style="color: #b22222; font-size: 24px; margin-bottom: 10px;">Your Account Has Been Verified!</h2>
                <strong>Dear Money Mestro,</strong>
                <p style="font-size: 16px; line-height: 1.5; color: #555555; margin-bottom: 20px;">We are pleased to inform you that your account with Intervault has been successfully verified. You can now access all of our secure banking services.</p>
                <p style="font-size: 16px; line-height: 1.5; color: #555555; margin-bottom: 20px;">To get started, please log in to your account by clicking the button below.</p>
                <a href="${process.env.client_domain}/login" style="background-color: #b22222; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block; font-size: 16px; font-weight: bold; margin-top: 15px;">Log In Now</a>
            </td>
        </tr>

        <!-- Footer Section -->
        <tr>
            <td style="background-color: #f9f9f9; padding: 20px 10px; text-align: center; font-size: 12px; color: #777777; border-top: 1px solid #e0e0e0;">
                <p style="color: red; font-weight: semibold; font-style: italic;"><span style="font-weight: bold;">⚠️ WARNING</span>: This email was sent from an unmonitored address. Please do not reply. If you suspect any fraudulent activity, please contact our support team immediately.</p>
            </td>
        </tr>
        <td align="center" style="padding: 20px; background-color: #f4f4f4; color: #999999; font-size: 12px;">
                &copy; 2025 InterVault. All rights reserved. <br />
                <a href="#" style="color: #999999; text-decoration: none;">Privacy Policy</a> | 
                <a href="#" style="color: #999999; text-decoration: none;">Contact Support</a>
              </td>
    </table>
</body>
</html>

        `
    }

    transporter.sendMail(options)
}

module.exports = sendConfirmationEmail