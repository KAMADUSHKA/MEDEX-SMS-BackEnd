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

//Post
router.post("/post/save", (req, res) => {
  let newPost = new Post(req.body);

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



// router.post("/", validater, UserController.userLogin);
// router.post("/createEmployee", auth, EmpTypeValidater, UserController.createEmployeData);
// router.get("/getEmployeeData", auth, UserController.EmployeeData);
// router.post("/EmployeeDataDelete", auth, UserController.EmployeeDataDelete);
// router.post("/EmployeeDataUpdate", auth, EmpTypeValidater, UserController.EmployeeDataUpdate);
// router.p

// router.post("/createCard", auth, upload.single('image'), UserController.createCard);
// router.post("/tableDataDelete", auth, UserController.tableDataDelete)
module.exports = router;
