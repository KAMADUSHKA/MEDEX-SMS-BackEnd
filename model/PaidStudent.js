const mongoose = require('mongoose');


// Schema for paid students
const paidStudentSchema = new mongoose.Schema({
studentId: {
    type: Number,
    required: true,
  },
  paymentPlans: {
    type: String,
    required: true,
  },
  slipLink: {
    type: String,
    required: true,
  },
  
});

// Schema for course resources
const courseEnrollmentSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  paidStudents: {
    type: [paidStudentSchema],
    // required: true,
  },
});

module.exports = mongoose.model('CourseEnrollment', courseEnrollmentSchema);
