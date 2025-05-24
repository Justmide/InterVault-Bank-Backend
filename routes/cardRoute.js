const express = require("express");
const { getUserCardById } = require("../controllers/userCards");
const router = express.Router();

router.get("/:id/cards", getUserCardById);

module.exports = router;