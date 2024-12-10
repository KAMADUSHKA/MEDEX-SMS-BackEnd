const mongoose = require("mongoose");

// Define the schema for exam results
const ExamSchema = new mongoose.Schema({
    course: {
        type: String,
        required: [true, "Course is required"],
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
    },
    batch: {
        type: String,
        required: [true, "Batch is required"],
    },
    studentName: {
        type: String,
        required: [true, "Student Name is required"],
    },
    regNo: {
        type: String,
        required: [true, "Registration Number is required"],
    },
    results: {
        type: String,
        enum: ["Pass", "Fail", "Pending"], // Result options
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


// Create the model for exam results
const Exam = mongoose.model("Exam", ExamSchema);

module.exports = Exam;
