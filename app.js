const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Middleware to handle JSON parsing errors

const AuthRoutes = require("./routes/authRoute");
const CreateAccount = require("./routes/accountRoute");
const CardRoute = require("./routes/cardRoute")

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/account", CreateAccount);
app.use("/api/v1/user", CardRoute)

module.exports = app;