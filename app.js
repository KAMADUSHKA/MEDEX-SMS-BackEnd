const express = require("express");
const bodyParse = require("body-parser");
const app = express();

const path = require("path");
const errorHandler = require("@adeona-tech/common").errorHandler;
const NotFoundError = require("@adeona-tech/common").NotFoundError;
const userRoutes = require("./routes/user");
const cookieSession = require("cookie-session");
const Mongoose = require("mongoose");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
// const postRoutes = require('./routes/post');

app.use(bodyParser.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.set("trust proxy", true); // trust first proxy
// app.use(postRoutes);

const DB_URL =
  "mongodb+srv://SampleUser1:SamplePW456@clusterforlms.amnj1.mongodb.net/LMS?retryWrites=true&w=majority&appName=ClusterForLMS";

const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifideTechnology: true,
  };
  try {
    Mongoose.connect(DB_URL);
    console.log("mongodb connect succes");
  } catch (error) {
    console.log(error);
    console.log("mongodb connection fail");
  }
});
database();

//Third-party middleware
app.use(
  cookieSession({
    signed: false,
    // secure: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,RefreshToken,RegisterToken,VerifyMobileToken,ChangePasswordToken,AddNewPasswordtoken,AddVerifyNewPasswordtoken,AdminAuthorization,GetTwoStepAuthToken"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/image", express.static("image"));
// app.use('/middleware', express.static('middleware'));

//user routes

app.use("/api/v1/users", userRoutes);
app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});
app.use(errorHandler);

const cors = require("cors");

// Allow all origins (for development purposes)
app.use(cors());

// Or restrict to your frontend's origin
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);


module.exports = app;
