const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  CourseName: {
    type: String,
    required: true,
  },
  CourseDuration: {
    type: String,
    required: true,
  },
  FullPayment: {
    type: Number,
    required: true,
  },
  InstallmentWise: {
    type: Number,
    required: true,
  },
  FirstPayment: {
    type: Number,
    required: true,
  },
  RegistrationFee: {
    type: Number,
    required: true,
  },
  OtherDetails: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
