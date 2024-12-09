const mongoose = require("mongoose");

// Define the schema for exam results
const ExamSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, "Course Name is required"],
    },
    studentId: {
        type: String,
        required: [true, "Student ID is required"],
    },
    studentName: {
        type: String,
        required: [true, "Student Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/\S+@\S+\.\S+/, "Email is invalid"], // Email validation
    },
    marks: {
        type: Number,
        required: [true, "Marks are required"],
        min: [0, "Marks cannot be less than 0"],
        max: [100, "Marks cannot be more than 100"],
    },
    grade: {
        type: String,
        enum: ["A", "B", "C", "D", "F", "NA"], // Grade options
        default: "NA",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model for exam results
const Exam = mongoose.model("Exam", ExamSchema);

module.exports = Exam;
