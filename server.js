const app = require("./app")
const cors = require('cors');
const dotEnv = require("dotenv")
const connectToDB = require("./config/connectToDb")
dotEnv.config()
app.use(cors())

connectToDB()

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is connected and running on ${PORT}`);
})


