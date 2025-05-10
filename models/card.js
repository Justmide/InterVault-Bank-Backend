const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
},
  cardNumber: {
    type: String
  },
  firstName: {
    type: String,
    },
  lastName: {
    type: String,
  },
  balance: {
    type: Number,
  },
  cvv: {
    type: Number,
    default: 805
  }

  // Add more fields like expiryDate, cvv if needed
});

module.exports = mongoose.model('card', cardSchema);
