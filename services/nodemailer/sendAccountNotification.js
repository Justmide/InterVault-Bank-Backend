const transporter = require("./transporter")
const dotEnv = require("dotenv")
dotEnv.config()

const sendAccountNotification = (email, firstName, accountNumber)=>{
if(!email){
    console.error("❌ No recipient email provided");
    return
}

const options = {
    from: `"InterVault Bank" <${process.env.EMAIL_USER}`,
    to: email,
    subject: "The Vault is yours",
    html: `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome Captain</title>
    <style>
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .content { padding: 20px !important; }
        .detail-table td { display: block; width: 100% !important; text-align: center !important; }
        .detail-table td:first-child { font-weight: bold; padding-top: 10px; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f4f4;">
      <tr>
        <td align="center">
          <table class="container" role="presentation" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff; border-radius:10px; margin: 30px 0;">
            <tr>
              <td style="padding: 30px 40px;" class="content">
                
                <table width="100%">
                  <tr>
                    <td align="center">
                      <img src="https://ucarecdn.com/f82a4e83-f177-4aed-9ac0-94c9657078c1/Intervaultremovebgpreview.png" alt="InterVault Logo" width="120" style="margin-bottom:10px;">
                      <h1 style="color:#c0392b; font-size:24px; margin: 10px 0;">Welcome aboard, Captain!</h1>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="font-size:16px; color:#333333; padding-bottom: 20px;">
                      Your InterVault account is now verified and active. Time to fly high with your new digital vault! 🚀
                    </td>
                  </tr>
                </table>

                <!-- DETAILS -->
                <table width="100%" class="detail-table" style="background-color:#f8f8f8; border-radius:8px; padding:15px;" cellpadding="10">
                  <tr>
                    <td style="font-weight: bold; color: #555;">👤 Account Holder:</td>
                    <td style="color:#333;">${firstName}</td>
                  </tr>

                  <tr>
                    <td style="font-weight: bold; color: #555;">🏦 Bank Name:</td>
                    <td style="color:#333;">InterVault Bank</td>
                  </tr>

                  <tr>
                    <td style="font-weight: bold; color: #555;">🏦 Account Number:</td>
                    <td style="color:#333;">${accountNumber}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #555;">📘 Account Type:</td>
                    <td style="color:#333;">Savings</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #555;">💰 Tier 2 Min:</td>
                    <td style="color:#333;">₦50.00</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #555;">💸 Tier 2 Max:</td>
                    <td style="color:#333;">₦500,000</td>
                  </tr>
                </table>

                <table width="100%" style="margin-top: 20px;">
                  <tr>
                    <td align="center" style="font-size:15px; color:#333;">
                      Now it’s time to fill that vault, move your coins like a pro, and enjoy banking the InterVault way ✨
                    </td>
                  </tr>
                </table>

                <table width="100%" style="margin-top: 30px;">
                  <tr>
                    <td align="center" style="font-size:12px; color:#888;">
                      &copy; 2025 InterVault — Banking the Bold Way ❤️
                    </td>
                  </tr>
                </table>

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

module.exports = sendAccountNotification