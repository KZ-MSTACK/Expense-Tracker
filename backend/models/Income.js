const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  Userid: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "User" ,
    'required': true,
  },

  amount: {
    type: Number,
    required: true,
  },

  Icon: {
    type: String,
    required: true, 
  },

  Source: {
    type: String,
    required: true,
  }, 
//   Example Salary, Freelance etc

  date: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

module.exports = mongoose.model('Income', incomeSchema);
