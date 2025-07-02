const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  Icon: {
    type: String,
    required: true,
  },

  Category: {
    type: String,
    required: true,
  },
  // Example: Food, Rent, Bills, Travel, etc.

  date: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);
