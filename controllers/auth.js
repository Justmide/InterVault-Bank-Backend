const UserModel = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generate_Random_String = require("../middlewares/generateString");
const sendVerificationEmail = require("../services/nodemailer/sendVerificationEmail");
const sendConfirmationEmail = require("../services/nodemailer/sendConfirmationEmail");
const generate2faCode = require("../middlewares/generate2faCode");
const sendVerify2faCode = require("../services/nodemailer/sendVerify2faCode");


const signup = async (req, res, next) =>{
const { password, firstName, lastName, email } = req.body
try {
    const salt = await bcrypt.genSalt(12);
    const hashedpassword = await bcrypt.hash(password, salt)

    const verificationToken = generate_Random_String(16)
    const verificationExp = Date.now() + 360000

    const user = await UserModel.create({
        ...req.body,
        password: hashedpassword,
        verificationToken,
        verificationExp,
    });

    if(!user){
        res.status(404).json({
            status: "Error",
            message: "Failed to Signup"
        });
        return
    }

    // send verification email
    sendVerificationEmail(email, firstName, verificationToken)

    res.status(201).json({
        status: "Succesful",
        message: "Signup successuful, Check email to verify account",
        user
    })
} catch (error) {
    console.error(error);
    next(error)
}

}

const verifyAcount = async (req, res)=>{
    const { token } = req.params
    try {
        const user = await UserModel.findOne({
            verificationToken:token,
            verificationExp : {$gt: Date.now()}
        })
        if(!user){
            res.status(404).json({
                status: "Failed",
                messages: "No user found"
            })
            return;
        }
        
        await UserModel.findByIdAndUpdate(user._id, {
            IsVerified: true,
            verificationToken: null,
            verificationExp: null
        })

        await sendConfirmationEmail(user.email)

        res.status(201).json({
            status: "Success",
            message: "congratulation! Your account has been verified..Check your mail for confirmation!",
        })

    } catch (error) {
        console.error
        res.status(500).json({
            status: "error",
            message: "An error occurred while verifying the account.",
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email }).select('+password');
       
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Email or password incorrect"
            });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
            return res.status(404).json({
                status: "Error",
                message: "Email or password incorrect."
            });
        }

        if (!user.IsVerified) {
            return res.status(404).json({
                status: "Error",
                message: "Please verify your email before logging in."
            });
        }

        // Generate and send the 2FA code
        const code = generate2faCode();
        const codeExp = Date.now() + 5 * 60 * 1000;
  
        user.verify2FaCode = code;
        user.verify2FaCodeExp = codeExp;
        await user.save();

        // Send the 2FA code email
        await sendVerify2faCode(user.email, code);
        

        // Respond with a success message and user info (except password)
        const token = jwt.sign(
            { email: user.email, 
              id: user._id 
            },
            process.env.jwt_secret_key,
            { expiresIn: process.env.jwt_exp }
        );
    
        res.status(200).json({
            message: "2FA code sent. Verify the code to proceed.",
            token: token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                cardNumber: user.cardNumber,
                balance: user.balance,
                accountNumber:user.accountNumber
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Error",
            message: "Something went wrong. Please try again later."
        });
    }
};


const verifyCode = async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user || user.verify2FaCode !== code || user.verify2FaCodeExp < Date.now()) {
            return res.status(400).json({
                status: "Error",
                message: "Invalid or expired 2FA code"
            });
        }

        // Clear 2FA fields after successful verification
        user.verify2FaCode = null;
        user.verify2FaCodeExp = null;
        await user.save();

       // Generate the JWT token
       const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.jwt_secret_key,
        { expiresIn: process.env.jwt_exp }
    );


        res.status(200).json({
            status: "Success",
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                email: user.email,
                token: token,
                firstName: user.firstName
            }
        });

    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "An error occurred during verification.",
            error: error.message
        });
    }
};



const logout = async (req, res) => {
    try {
        // Invalidate token by instructing client to remove it
        res.cookie("token", "",  { 
            httpOnly: true, 
            expires: new Date(0)
         });
        
        res.status(200).json({
             message: "Logout successful" 
            });
    } catch (error) {
        res.status(500).json({ 
            message: "Logout failed", error });
    }
};





module.exports = {
    signup,
    verifyAcount,
    login,
    verifyCode,
    logout
}