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
// const ZoomRecodings = require("../model/ZoomRecordings");
const ZoomRecordings = require("../model/zoomRecordings");
const CourseResource = require("../model/lectureMaterial");
const lectureMaterial = require("../model/lectureMaterial");
const Exam = require('../model/Exam');
const PaymentPlans = require("../model/PaymentPlans");


////////////////////////
//add exam
router.post("/exam-results/add", async (req, res) => {
  try {
    const { courseName, studentId, studentName, email, marks, grade } = req.body;

    if (!courseName || !studentId || !studentName || !email || marks == null) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newResult = new Exam({
      courseName,
      studentId,
      studentName,
      email,
      marks,
      grade,
    });

    await newResult.save();

    res.status(200).json({ message: "Exam result added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "An error occurred", details: err.message });
  }
});

//edit exam

router.put("/exam-results/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedResult = await ExamResult.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedResult) {
      return res.status(404).json({ error: "Exam result not found!" });
    }

    res.status(200).json({
      message: "Exam result updated successfully!",
      data: updatedResult,
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred", details: err.message });
  }
});

//delete exam
router.delete("/exam-results/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedResult = await ExamResult.findByIdAndDelete(id);

    if (!deletedResult) {
      return res.status(404).json({ error: "Exam result not found!" });
    }

    res.status(200).json({ message: "Exam result deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "An error occurred", details: err.message });
  }
});


//exam view
router.get("/exam-results", async (req, res) => {
  try {
    const results = await ExamResult.find();

    res.status(200).json({
      message: "Exam results retrieved successfully!",
      data: results,
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred", details: err.message });
  }
});


/////admin main
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
    const isAdmin = userTrue.isAdmin;

    if (accountStatus == 0) {
      const token = jwt.sign(
        { email: req.body.email }, // Payload (data you want to encode in the token)
        "your_secret_key", // Secret key (use a strong, secure key and keep it private)
        { expiresIn: "1h" } // Optional: Token expiration time
      );
      console.log("token is:", token);
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

/////update pasword
router.post("/User/passwordUpdate", async (req, res, next) => {
  try {
    const user = await Admin.findOne({ email: req.body.email });
    const updatedPassword = req.body.password;

    console.log("my user is", req.body.email);
    console.log("find user is", user);
    console.log("my user new password is", updatedPassword);

    if (!user) throw Error("User Not Found");

    user.password = updatedPassword;
    await user.save();

    res.status(200).json({
      status: "Success",
      Comment: "User password update successfully!",
      data: {
        email: req.body.email,
      },
    });
  } catch (error) {
    console.log("Error during login:", error);
    res.status(400).json({
      status: "fail",
      comment: "User password Update unsuccessfully",
      data: {
        error: error.message,
      },
    });
  }
});

/////Delet user
router.delete("/User/delete", async (req, res, next) => {
  try {
    console.log("wwwwwwwwwwwwwwww", req.body);
    const user = await Admin.findOne({ email: req.body.email });
    const Password = req.body.password;

    console.log("my user is", req.body.email);
    console.log("find user is", user);
    console.log("my user new password is", Password);
    const userTruePassword = await user.password;
    console.log("my user db password is", userTruePassword);
    if (!user) throw Error("User Not Found");
    if (req.body.password !== userTruePassword)
      throw new Error("User Password is invalid");

    await Admin.deleteOne({ email: req.body.email });

    res.status(200).json({
      status: "Success",
      Comment: "User Delete successfully!",
      data: {
        email: req.body.email,
      },
    });
  } catch (error) {
    console.log("Error during login:", error);
    res.status(400).json({
      status: "fail",
      comment: "User delete unsuccessfully",
      data: {
        error: error.message,
      },
    });
  }
});

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

//Course update
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

///// course update
router.post("/courseData/update/:id", (req, res) => {
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
        success: "Updated successfully",
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
router.delete(
  "/zoomSession/lecture/delete/:subjectId/:lectureId",
  (req, res) => {
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
  }
);

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
      error: error.message,
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
      error: error.message,
    });
  }
});

///// zoom session get//////
router.get("/OnlineRecordings/zoom", (req, res) => {
  ZoomRecordings.find().exec((err, ZoomRecordings) => {
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

////////////////////
////// Resources
router.post('/resources/upload', upload.single('file'), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'File not uploaded!' });
    }

    // Extract metadata from the request body
    const { courseName, materialName, materialType, materialDescription } = req.body;

    // Validate required fields
    // if (!courseName || !materialName || !materialType || !materialDescription) {
    //   return res.status(400).json({ error: 'All fields are required!' });
    // }
    
    // Create a new lecture material object
    console.log("aaaaaaaaaaaaaaaaaaaaaa",req.file.filename)
    const lectureMaterial = {
      materialName,
      materialType,
      materialDescription,
      // materialLink: path.basename(req.file.path),
      materialLink: req.file.filename, // Save the file path
    };

    // Check if the course already exists
    let courseResource = await CourseResource.findOne({ courseName });

    if (courseResource) {
      // If course exists, add the new lecture material
      courseResource.lectureMaterials.push(lectureMaterial);
    } else {
      // Create a new course resource if it doesn't exist
      courseResource = new CourseResource({
        courseName,
        lectureMaterials: [lectureMaterial],
        paidStudents: [], // Initialize an empty array for paid students
      });
    }

    // Save to the database
    await courseResource.save();

    res.status(200).json({
      message: 'Lecture material uploaded and saved successfully!',
      data:courseResource,
    });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred', details: err.message });
  }
});

//////////////// paid student add 
router.post('/resources/paid-students', async (req, res) => {
  try {
    // Extract data from the request body
    const { courseName, studentId, email } = req.body;

    // Validate required fields
    if (!courseName || !studentId || !email) {
      return res.status(400).json({ error: 'All fields are required!' });
    }

    // Find the course by name
    let courseResource = await CourseResource.findOne({ courseName });

    if (!courseResource) {
      return res.status(404).json({ error: 'Course not found!' });
    }

    // Check if the student already exists
    const studentExists = courseResource.paidStudents.some(
      (student) => student.studentId === studentId
    );

    if (studentExists) {
      return res.status(400).json({ error: 'Student is already added!' });
    }

    // Create a new student object
    const newStudent = {
      studentId,
      email,
    };

    // Add the student to the paidStudents array
    courseResource.paidStudents.push(newStudent);

    // Save the updated document
    await courseResource.save();

    res.status(200).json({
      message: 'Student added successfully!',
      data: courseResource,
    });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred', details: err.message });
  }
});


/// get Resources
router.get("/resources",(req, res) => {
  lectureMaterial.find().exec((err, lectureMaterial) => {
    // console.log("11111111")
    if(err) {
      // console.log("111111112222222222")
      return res.status(400).json({
        error:err
      })
    }return res.status(200).json({
       
      success:true,
      lectureMaterial:lectureMaterial
    })

  })
})
//////////////////////////////////////////
////////////Available Payment Plans
router.post("/Payment/Plans", (req, res) => {
  let paymentPlans = new PaymentPlans(req.body);
  paymentPlans.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Payment Plans saved successfully",
    });
  });
});

///// get Available Payment Plans//////
router.get("/Payment/Plans", (req, res) => {
  PaymentPlans.find().exec((err, PaymentPlans) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      CoursesData: PaymentPlans,
    });
  });
});

///////// delete Available Payment Plans
router.delete("/Payment/Plans/delete/:id", (req, res) => {
  PaymentPlans.findByIdAndRemove(req.params.id, (err, deletedPaymentPlans) => {
    if (err) {
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    }
    return res.json({
      message: "Deleted successfully",
      deletData: deletedPaymentPlans,
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
