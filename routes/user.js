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
const { EmpTypeValidater } = require("../middleware/EmpTypeValidater");
const { DepartmentValidater } = require("../middleware/DepartmentValidater");
const { WorkingLocationValidater } = require("../middleware/WorkingLocationValidater");
const { JobPositionValidater } = require("../middleware/JobPositionValidater");
const { DepartureEmployeeValidater } = require("../middleware/DepartureEmployeeValidater");
const { SalaryValidater } = require("../middleware/SalaryValidater");
const { AllowanceValidater } = require("../middleware/AllowanceValidater");
const Course = require("../model/Course");
const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ZoomOnlineSessions = require("../model/ZoomOnlineSessions");
const ZoomRecordings = require("../model/zoomRecordings"); // Fixed import case sensitivity

/// Admin User Creation
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

/// Admin Login
router.post("/User/adminLogin", async (req, res, next) => {
  try {
    const userTrue = await Admin.findOne({ email: req.body.email });

    if (!userTrue) throw Error("User Not Found");
    const userTruePassword = userTrue.password;
    if (req.body.password !== userTruePassword)
      throw new Error("Invalid Password");

    const accountStatus = userTrue.account_lock;
    const isAdmin = userTrue.isAdmin;

    if (accountStatus === 0) {
      const token = jwt.sign(
        { email: req.body.email },
        "your_secret_key",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        status: "Success",
        Comment: "User Login Authentication!",
        token: token,
        data: {
          email: req.body.email,
          role: isAdmin,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      comment: "Login failed! Please enter correct email and password.",
      data: {
        error: error.message,
      },
    });
  }
});

/// CRUD Operations for Post
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

router.put("/post/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ success: "Update successful" });
    }
  );
});

router.delete("/post/delete/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    if (err) {
      return res.status(400).json({ message: "Deletion unsuccessful", err });
    }
    return res.json({ message: "Deleted successfully", deletedPost });
  });
});

/// CRUD Operations for Course
router.post("/course/save", (req, res) => {
  let newCourse = new Course(req.body);
  newCourse.save((err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({ success: "Course saved successfully" });
  });
});

router.get("/course", (req, res) => {
  Course.find().exec((err, course) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({ success: true, CoursesData: course });
  });
});

router.put("/course/update/:id", (req, res) => {
  Course.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ success: "Update successful" });
    }
  );
});

router.delete("/course/delete/:id", (req, res) => {
  Course.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    if (err) {
      return res.status(400).json({ message: "Deletion unsuccessful", err });
    }
    return res.json({ message: "Deleted successfully", deletedPost });
  });
});

/// Zoom Sessions
router.post("/OnlineSessions/zoom", (req, res) => {
  let newSession = new ZoomOnlineSessions(req.body);
  newSession.save((err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({ success: "Zoom session saved successfully" });
  });
});

<<<<<<< HEAD
// zoom session subject delete
router.delete("/zoomSession/subject/delete/:id", (req, res) => {
  ZoomOnlineSessions.findByIdAndRemove(req.params.id, (err, deletedPost) => {
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

// zoom session lecture delete
router.delete("/zoomSession/lecture/delete/:subjectId/:lectureId", (req, res) => {
  const { subjectId, lectureId } = req.params;

  ZoomOnlineSessions.findByIdAndUpdate(
    subjectId,
    {
      $pull: {
        links: { _id: lectureId }, 
      },
    },
    { new: true }, 
    (err, updatedSubject) => {
      if (err) {
        return res.status(400).json({
          message: "Failed to delete the link",
          err,
        });
      }
      if (!updatedSubject) {
        return res.status(404).json({
          message: "Subject or link not found",
        });
      }
      return res.json({
        message: "Link deleted successfully",
        updatedSubject,
      });
    }
  );
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
=======
>>>>>>> 14e4715377059d54ed21dcdbee81d7f8ce9c05f3
router.get("/OnlineSessions/zoom", (req, res) => {
  ZoomOnlineSessions.find().exec((err, sessions) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({ success: true, SessionsData: sessions });
  });
});

/// Zoom Recordings
router.post("/OnlineRecordings/zoom", (req, res) => {
  let newRecording = new ZoomRecordings(req.body);
  newRecording.save((err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({
      success: "Zoom recording saved successfully",
    });
  });
});

<<<<<<< HEAD
// recording subject delete
router.delete("/recording/subject/delete/:id", (req, res) => {
  ZoomRecordings.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    }
    return res.json({
      message: "Deleted successfully",
      deletedPost,
    });
  });
});

// recording lecture delete
router.delete("/recording/lecture/delete/:subjectId/:lectureId", (req, res) => {
  const { subjectId, lectureId } = req.params;

  ZoomRecordings.findByIdAndUpdate(
    subjectId,
    {
      $pull: {
        links: { _id: lectureId }, 
      },
    },
    { new: true }, 
    (err, updatedSubject) => {
      if (err) {
        return res.status(400).json({
          message: "Failed to delete the link",
          err,
        });
      }
      if (!updatedSubject) {
        return res.status(404).json({
          message: "Subject or link not found",
        });
      }
      return res.json({
        message: "Link deleted successfully",
        updatedSubject,
      });
    }
  );
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
=======
>>>>>>> 14e4715377059d54ed21dcdbee81d7f8ce9c05f3
router.get("/OnlineRecordings/zoom", (req, res) => {
  ZoomRecordings.find().exec((err, recordings) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({
      success: true,
      RecordingsData: recordings,
    });
  });
});

module.exports = router;
