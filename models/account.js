const mongoose = require("mongoose")

const accountSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    accountNumber: { 
        type: String, 
        unique: true, 
        required: true
     },
     bankName:{
        type: String,
        default: "Intervault Bank"
     },
     bank_code:{
        type: Number,
        default: 501
     },
    accountType: { 
        type: String,
        default: "savings"
    },
    phone: { 
        type: String,
        required: true 
    },
    address: { 
        type: String,
        required: true
    
    },
    addressLine2:{
        type: String,
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    zipcode:{
        type: String,
        required: true
    },
    dob: { 
        type: String, 
        required: true 
    },
nin:{
    type: Number,
},
govtId:{
    type: Number
},
 nationality :{
    type: String,
    required: [true, "Country is required"],
    enum: ["Nigeria", "Ghana", "Other"]
},
citizenship :{
    type: String,
    required: [true, "Citizenship is required"],
    enum: ["Nigeria", "Ghana", "Other"]
},
    balance: { 
        type: Number,
         default: 100 
        },
},
 { 
    timestamps: true 
});

const account = mongoose.model("account", accountSchema)

module.exports = account