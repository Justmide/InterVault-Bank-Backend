const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config();

const mongoUrl = process.env.MONGO_URL;

const connectToDB = async ()=>{
    try {
        if(!mongoUrl){
            throw new Error("MONGO_URL is undefined in the .env");
        }
        const connect = await mongoose.connect(mongoUrl)
        console.log('Mongo DB Connected ✅');
        
    } catch (error) {
        console.error("Mongo DB failed to connect ❌")
    }
}


module.exports = connectToDB