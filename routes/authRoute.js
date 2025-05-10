const express = require("express")
const { signup, verifyAcount, login, logout, verifyCode } = require("../controllers/auth")
const router = express.Router()



router.route("/signup").post(signup)
router.route("/verify/:token").post(verifyAcount)
router.route("/verify2facode").post(verifyCode)
router.route("/login").post(login)
router.route('/logout').post(logout)



module.exports = router