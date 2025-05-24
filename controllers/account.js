const account = require("../models/account")
const UserModel = require("../models/user"); 
const card = require('../models/card'); // Adjust the path if needed
const axios = require("axios");
const sendAccountNotification = require("../services/nodemailer/sendAccountNotification");

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET
// Function to generate a unique 10-digit account number
const generate_account_number = async () => {
    let accountNumber;
    let isUnique = false;

    while (!isUnique) {
        accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const existingAccount = await account.findOne({ accountNumber });
        if (!existingAccount) {
            isUnique = true;
        }
    }

    return accountNumber;
}; 


const generate_card_number = async () => {
    let cardNumber;
    let isUnique = false;
  
    while (!isUnique) {
      // Generate 16-digit number
      cardNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
  
      // Check if it already exists
      const existingCard = await card.findOne({ cardNumber });
      if (!existingCard) {
        isUnique = true;
      }
    }
  
    return cardNumber;
  };
  

const createAccount = async (req, res) => {
    const { userId, accountType = "savings", phone, address,state, city, zipcode, dob, gender, verification, nin, govtId, nationality, citizenship } = req.body;

    try {
        // Check if user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }

        // Generate unique account number
        const accountNumber = await generate_account_number();

        // Create new bank account
        const newAccount = new account({
            userId,
            accountNumber,
            accountType,
            phone, 
            address,
            state, 
            city, 
            zipcode, 
            dob, 
            gender, 
            nin,
            govtId,
            nationality, 
            citizenship,
            balance: 100 // Default balance
        });

        // Save account
        await newAccount.save();

        // === Create Credit Card ===
        const cardNumber = await generate_card_number();

        const newCreditCard = new card({
            userId,
            cardNumber,
            firstName: user.firstName,
            lastName: user.lastName,
            balance: 100 // Match default balance
        });

        await newCreditCard.save();

        await sendAccountNotification(user.email, user.firstName, accountNumber)
        
        return res.status(201).json({
            status: "Success",
            message: "Account and Credit Card Created Successfully",
            account: newAccount,
            card: newCreditCard
        });
        

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            status: "Failed",
            message: "Error creating account and card",
            error: error.message
        });
    }
};


// THIS IS STRICTLY FOR ADMIN 
const get_User_Accounts = async (req, res) => {
    try {
        const { accountNumber } = req.params;

        // Validate input
        if (!accountNumber) {
            return res.status(400).json({
                status: "Failed",
                message: "Account number is required"
            });
        }

        // Fetch accounts from the database
        const accounts = await account.find({ accountNumber });

        // Check if accounts exist
        if (accounts.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "No accounts found for the provided account number"
            });
        }

        // Fetch user details for the first account (assuming one user per account)
        const user = await UserModel.findById(accounts[0].userId);

        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User associated with the account not found"
            });
        }

        // Respond with account and user details
        res.status(200).json({
            status: "Success",
            message: "Accounts retrieved successfully",
            accountDetails: accounts,
            user: {
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (error) {
        console.error("Error fetching accounts:", error);
        res.status(500).json({
            status: "Failed",
            message: "Error retrieving accounts",
            error: error.message
        });
    }
};

// const getAccountDetails = async(req, res, next)=>{
//     try {
//         const { accountNumber } = req.params;

//         // Validate input
//         if (!accountNumber) {
//             return res.status(400).json({
//                 status: "Failed",
//                 message: "Account number is required"
//             });
//         }

//         // Fetch accounts from the database
//         const accounts = await account.find({ accountNumber });

//         // Check if accounts exist
//         if (accounts.length === 0) {
//             return res.status(404).json({
//                 status: "Failed",
//                 message: "No accounts found for the provided account number"
//             });
//         }

//         // Fetch user details for the first account (assuming one user per account)
//         const user = await UserModel.findById(accounts[0].userId);

//         if (!user) {
//             return res.status(404).json({
//                 status: "Failed",
//                 message: "User associated with the account not found"
//             });
//         }

//         // Respond with account and user details
//         res.status(200).json({
//             status: "Success",
//             message: "User Account found",
//             accountDetails: accountNumber,
//             firstName: user.firstName,
//             lastName: user.lastName
//         });
// } catch (error) {
//    console.error("Error finding Account Details", error)
//    res.status(500).json({
//     status: "Failed",
//     message: "Error Finding accounts",
//     error: error.message
//    }) 
//    next()
// }

// }

// Get all banks
const getBanks = async (req, res) => {
    try {
        const response = await axios.get("https://api.paystack.co/bank", {
            headers: { 
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
            },
        });

        res.status(200).json({
            status: "Success",
            message: "Banks retrieved successfully",
            banks: response.data.data,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Error fetching banks",
            error: error.message,
        });
    }
};

// Validate Account Number
const validateAccount = async (req, res) => {
    const { account_number, bank_code } = req.body;

    if (!account_number || !bank_code) {
        return res.status(400).json({ 
            message: "Account number and bank code are required" });
    }

    try {
        // Check if the account exists in your database
        const localAccount = await account.findOne({ 
            accountNumber: account_number, 
            bank_code: 501  // Only checks Intervault accounts
        });

        if (localAccount) {
            const user = await UserModel.findById(localAccount.userId);
            if (!user) {
                return res.status(404).json({ 
                    message: "No accounts found for the provided account number" });
            }

            return res.status(200).json({
                status: "Success",
                message: "Account found in system",
                accountDetails: {
                    accountNumber: account_number,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            });
        }

        // Validate using Paystack
        const response = await axios.get(`https://api.paystack.co/bank/resolve`, {
            params: { account_number, bank_code },
            headers: {
               Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
            },
        });

        return res.status(200).json({
            status: "Success",
            message: "Account validated with Paystack",
            data: response.data.data,
        });
    } catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: error.response?.data?.message || "Validation failed",
        });
    }
};


// Strictly for admin 
const deleteAccount = async (req, res) => {
    try {
        const { accountId } = req.params;
        if (!accountId) {
            return res.status(400).json({
                status: "Failed",
                message: "User ID is required"
            });
        }

        const accDelete = await account.findByIdAndDelete(accountId);

        if (!accDelete) {
            return res.status(404).json({
                status: "Failed",
                message: "Account not found"
            });
        }

        res.status(200).json({
            status: "Success",
            message: "Account deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({
            status: "Failed",
            message: "Error deleting account",
            error: error.message
        });
    }
};




module.exports = { 
    createAccount,
    get_User_Accounts,
    getBanks,
    validateAccount,
    deleteAccount
};
