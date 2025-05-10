const crypto = require("crypto")

const generate_Random_String = (num)=>{
    const string = crypto.randomBytes(num).toString('hex')
    return string
}

module.exports = generate_Random_String