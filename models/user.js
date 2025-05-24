const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        required : [true, "Last Name is required"]
    },
    email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: { 
        type: String, 
        enum: ["customer", "admin"], 
        default: "customer"
     },  
       gender :{
        type: String,
        required: [true, "Gender is required"],
        enum: ['Male' , 'Female', "idiot"]
    },
  
    accounts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Account" 
    }], // Linked Accounts
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    verificationToken: {
        type: String
    },
    verificationExp : {
        type: Number
    },
    IsVerified: {
        type : Boolean,
        default : false
    },
    verify2FaCode: {
        type: String,
        default: false
    },
    verify2FaCodeExp: {
        type: Date,
        default: null
    }
    
})

const UserModel = mongoose.model("customer", userSchema)

module.exports = UserModel
