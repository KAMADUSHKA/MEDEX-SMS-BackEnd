const mongoose = require('mongoose');

// Schema for lecture materials
const lectureMaterialSchema = new mongoose.Schema({
  materialName: {
    type: String,
    required: true,
  },
  materialType: {
    type: String,
    required: true,
  },
  materialDescription: {
    type: String,
    required: true,
  },
  materialLink: {
    type: String,
    required: true,
  },
});

// Schema for paid students
const paidStudentSchema = new mongoose.Schema({
  studentId: {
    type: Number,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Schema for course resources
const courseResourceSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  lectureMaterials: {
    type: [lectureMaterialSchema],
    required: true,
  },
  paidStudents: {
    type: [paidStudentSchema],
    required: true,
  },
});

module.exports = mongoose.model('CourseResource', courseResourceSchema);
