const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const path = require("path");
const { errorHandler, NotFoundError } = require("@adeona-tech/common");
const userRoutes = require("./routes/user");

const app = express();

// Middleware for parsing requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Trust proxy (useful when behind a reverse proxy)
app.set("trust proxy", true);

// MongoDB Connection
const DB_URL =
  "mongodb+srv://SampleUser1:SamplePW456@clusterforlms.amnj1.mongodb.net/LMS?retryWrites=true&w=majority&appName=ClusterForLMS";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

connectToDatabase();

// Cookie session setup
app.use(
  cookieSession({
    signed: false, // Disable signing cookies (stateless session)
    // secure: true, // Uncomment for production (requires HTTPS)
  })
);

// CORS configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, RefreshToken, RegisterToken, VerifyMobileToken, ChangePasswordToken, AddNewPasswordToken, AddVerifyNewPasswordToken, AdminAuthorization, GetTwoStepAuthToken"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Static file serving
app.use("/image", express.static(path.join(__dirname, "image")));

// Routes
app.use("/api/v1/users", userRoutes);

// Handle 404 errors
app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
