const mongoose = require("mongoose");

const PaymentPlansSchema = new mongoose.Schema({
  CourseName: {
    type: String,
    required: true,
  },
  PaymentPlansName: {
    type: String,
    required: true,
  },
  PaymentAmountForDuration: {
    type: Number,
    required: true,
  },
  TmeDuration: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("PaymentPlans", PaymentPlansSchema);
