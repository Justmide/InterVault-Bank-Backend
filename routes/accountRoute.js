const express = require("express")
const { createAccount, get_User_Accounts, deleteAccount, validateAccount, getBanks } = require("../controllers/account")
const router = express.Router()

router.route("/create").post(createAccount)
router.route("/userDetails/:accountNumber").get(get_User_Accounts)
router.route("/banks").get(getBanks)
router.route("/find-account").get(validateAccount)
router.route("/delete-account/:accountId").delete(deleteAccount)

module.exports = router