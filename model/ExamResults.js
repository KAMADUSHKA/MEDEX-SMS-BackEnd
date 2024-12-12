const mongoose = require("mongoose");

// Schema for student results
const studentResultSchema = new mongoose.Schema({
  studentId: {
    type: Number,
    // required: true,
  },
  Result: {
    type: String, // Use String for grades or Number for marks
    // required: true,
  },
});

// Schema for subjects
const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    // required: true,
  },
  StudentResults: {
    type: [studentResultSchema],
    // required: true, // Each subject must have student results
  },
});

// Schema for courses
const examResultsSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  Subjects: {
    type: [subjectSchema],
    // required: true, // Each course must have subjects
  },
});

module.exports = mongoose.model("ExamResults", examResultsSchema);
