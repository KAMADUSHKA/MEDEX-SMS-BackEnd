const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler, NotFoundError } = require("@adeona-tech/common");
require("dotenv").config(); // Load environment variables

const app = express();

const DB_URL = process.env.MONGO_URI || "mongodb+srv://SampleUser1:SamplePW456@clusterforlms.amnj1.mongodb.net/LMS?retryWrites=true&w=majority&appName=ClusterForLMS";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    signed: false,
  })
);

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Static files
app.use("/image", express.static("image"));

// MongoDB Connection
const database = () => {
  try {
    mongoose.connect(DB_URL); // No need for deprecated options
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
  }
};
database();

// Routes
app.use("/api/v1/users", require("./routes/user"));

// Error handling
app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});
app.use(errorHandler);

module.exports = app;
