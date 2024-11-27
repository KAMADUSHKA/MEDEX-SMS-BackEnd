const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const { body, validationResult } = require("express-validator");
const UserController = require("../controllers/user");
const validationRequest = require("@adeona-tech/common").validateRequest;
const checkAuth = require("@adeona-tech/common").checkAuth;
const auth = require("../middleware/auth");
const validater = require("../middleware/validater").validater;
const upload = require("../middleware/upload.js");
const upload_TableData = require("../middleware/upload_TableData");
const { route } = require("../app");
const { EmpTypeValidater } = require("../middleware/EmpTypeValidater");
const { DepartmentValidater } = require("../middleware/DepartmentValidater");
const {
  WorkingLocationValidater,
} = require("../middleware/WorkingLocationValidater");
const { JobPositionValidater } = require("../middleware/JobPositionValidater");
const {
  DepartureEmployeeValidater,
} = require("../middleware/DepartureEmployeeValidater");
const { SalaryValidater } = require("../middleware/SalaryValidater");
const { AllowanceValidater } = require("../middleware/AllowanceValidater");
const Course = require("../model/Course");
const Admin = require("../model/Admin");
const { where } = require("sequelize");
const { tokenLife } = require("@adeona-tech/common/config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ZoomOnlineSessions = require("../model/ZoomOnlineSessions");
const ZoomRecodings = require("../model/ZoomRecordings");
const ZoomRecordings = require("../model/ZoomRecordings");

///User Post
router.post("/AdminUserCreation", (req, res) => {
  let newPost = new Admin(req.body);

  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Posts saved successfully",
    });
  });
});

router.post("/User/adminLogin", async (req, res, next) => {
  try {
    const userTrue = await Admin.findOne({ email: req.body.email });

    console.log("my user is", req.body.email);
    console.log("find user is", userTrue);

    if (!userTrue) throw Error("User Not Found");
    const userTruePassword = await userTrue.password;
    if (req.body.password !== userTruePassword)
      throw new Error("User Password is invalid");
    const accountStatus = userTrue.account_lock;
    const isAdmin = userTrue.isAdmin

    if (accountStatus == 0) {
      const token = jwt.sign(
        { email: req.body.email }, // Payload (data you want to encode in the token)
        "your_secret_key", // Secret key (use a strong, secure key and keep it private)
        { expiresIn: "1h" } // Optional: Token expiration time
      );
      console.log("token is:",token)
      res.status(200).json({
        status: "Success",
        Comment: "User Login Authentication!",
        token: token,
        data: {
          email: req.body.email,
          role:isAdmin
        },
      });
    }
  } catch (error) {
    console.log("Error during login:", error);
    res.status(400).json({
      status: "fail",
      comment: "login fail!, enter correct email",
      data: {
        error: error.message,
      },
    });
  }
}); 

//////////////////////////////////////////////////

//get
router.get("/post", (req, res) => {
  Post.find().exec((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPost: post,
    });
  });
});



//post update
router.put("/post/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "update succesfully",
      });
    }
  );
});

//delet
router.delete("/post/delete/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        message: "Deletion unsuccessful",
        err,
      });
    }
    return res.json({
      message: "Deleted successfully",
      deletedPost,
    });
  });
});

///////////////////////////////////////////
///////courses///////

/// courses post
router.post("/course/save", (req, res) => {
  let newCourse = new Course(req.body);
  newCourse.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Course saved successfully",
    });
  });
});

///// courses get
router.get("/course", (req, res) => {
  Course.find().exec((err, course) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      CoursesData: course,
    });
  });
});

//delet
router.delete("/course/delete/:id", (req, res) => {
  Course.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        message: "Deletion unsuccessful",
        err,
      });
    }
    return res.json({
      message: "Deleted successfully",
      deletedPost,
    });
  });
});

//post update
router.put("/course/update/:id", (req, res) => {
  Course.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "update succesfully",
      });
    }
  );
});

////////////////////////////////////////////////////////
///// Zoom Sessions /////

router.post("/OnlineSessions/zoom", (req, res) => {
  let newCourse = new ZoomOnlineSessions(req.body);
  newCourse.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "link saved successfully",
    });
  });
});

///// Zoom Sessions update /////
router.post("/OnlineSessions/zoomLink/:id", async (req, res) => {
  try {
    // Extract the ID of the subject and the new link from the request
    const subjectId = req.params.id;
    const newLink = req.body;

    // Validate the new link structure
    if (!newLink.title || !newLink.url) {
      return res.status(400).json({ error: "Invalid link data" });
    }

    // Update the subject by pushing the new link to the links array
    const updatedSubject = await ZoomOnlineSessions.findByIdAndUpdate(
      subjectId,
      { $push: { links: newLink } },
      { new: true, runValidators: true } // Ensures the updated document is returned
    );

    // If the subject is not found
    if (!updatedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    return res.status(200).json({
      success: "Link added successfully",
      data: updatedSubject,
    });
  } catch (error) {
    return res.status(500).json({ 

      error: error.message 
    });
  }
});



///// zoom session get//////
router.get("/OnlineSessions/zoom", (req, res) => {
  ZoomOnlineSessions.find().exec((err, ZoomOnlineSessions) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      CoursesData: ZoomOnlineSessions,
    });
  });
});

////////////////////////////////////////////////////////
///// Zoom recording /////
router.post("/OnlineRecordings/zoom", (req, res) => {
  let newCourse = new ZoomRecordings(req.body);
  newCourse.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "recording Subject saved successfully",
    });
  });
});

///// Zoom Recording update /////
router.post("/OnlineSessions/zoomRecording/:id", async (req, res) => {
  try {
    // Extract the ID of the subject and the new link from the request
    const subjectId = req.params.id;
    const newLink = req.body;

    // Validate the new link structure
    if (!newLink.title || !newLink.url) {
      return res.status(400).json({ error: "Invalid link data" });
    }

    // Update the subject by pushing the new link to the links array
    const updatedSubject = await ZoomRecordings.findByIdAndUpdate(
      subjectId,
      { $push: { links: newLink } },
      { new: true, runValidators: true } // Ensures the updated document is returned
    );

    // If the subject is not found
    if (!updatedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    return res.status(200).json({
      success: "Link added successfully",
      data: updatedSubject,
    });
  } catch (error) {
    return res.status(500).json({ 

      error: error.message 
    });
  }
});

///// zoom session get//////
router.get("/OnlineRecordings/zoom", (req, res) => {
  ZoomRecordings.find().exec((err, ZoomRecordings ) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      CoursesData: ZoomRecordings,
    });
  });
});



// router.post("/", validater, UserController.userLogin);
// router.post("/createEmployee", auth, EmpTypeValidater, UserController.createEmployeData);
// router.get("/getEmployeeData", auth, UserController.EmployeeData);
// router.post("/EmployeeDataDelete", auth, UserController.EmployeeDataDelete);
// router.post("/EmployeeDataUpdate", auth, EmpTypeValidater, UserController.EmployeeDataUpdate);
// router.p

// router.post("/createCard", auth, upload.single('image'), UserController.createCard);
// router.post("/tableDataDelete", auth, UserController.tableDataDelete)
module.exports = router;
