const card = require("../models/card");

const getUserCardById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Validate userId
        if (!userId) {
            return res.status(400).json({
                status: "Failed",
                message: "User ID is required"
            });
        }

        // Fetch all cards associated with the user
        const userCards = await card.find({ userId });
        if (!userCards || userCards.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "No cards found for this user"
            });
        }

        // Mask card numbers for security
        const maskedCards = userCards.map((card) => {
            const lastFour = card.cardNumber.slice(-4);
            return {
                cardNumber: `**** **** **** ${lastFour}`,
                balance: card.balance,
                firstName: card.firstName,
                lastName: card.lastName,
            };
        });

        // Respond with the masked cards
        res.status(200).json({
            status: "Success",
            message: "User cards retrieved successfully",
            cards: maskedCards,
        });
    } catch (error) {
        console.error("Error fetching user cards:", error);
        res.status(500).json({
            status: "Failed",
            message: "An error occurred while fetching user cards",
            error: error.message,
        });
    }
};

module.exports = {
    getUserCardById,
};