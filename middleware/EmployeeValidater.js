const { body, validationResult } = require("express-validator");

const EmployeeValidater = [
  body("FName")
    .isLength({ min: 1 })
    .withMessage("please enter a valid First Name"),
  body("LName")
    .isLength({ min: 1 })
    .withMessage("please enter a valid Last Namet"),
    body("HomeCnt")
    .isLength({ min: 1 })
    .withMessage("please enter a valid Home Contact"),
  body("PersonalCnt")
    .isLength({ min: 1 })
    .withMessage("please enter a valid Personal Contact"),
    body("Address")
    .isLength({ min: 1 })
    .withMessage("please enter a valid Address"),
  body("WorkEmail")
    .isLength({ min: 1 })
    .withMessage("please enter a valid Work Email"),
    body("NIC")
    .isLength({ min: 1 })
    .withMessage("please enter a valid NIC"),
  body("JobPosition")
    .isLength({ min: 1 })
    .withMessage("please enter a valid Job Position"),
    body("EmploymentType")
    .isLength({ min: 1 })
    .withMessage("please enter a valid Employment Type"),
  body("EmpDate")
    .isLength({ min: 1 })
    .withMessage("please enter a valid Employement Date"),
    body("FinalDate")
    .isLength({ min: 1 })
    .withMessage("please enter a valid Final Date"),
  body("Location")
    .isLength({ min: 1 })
    .withMessage("please enter a valid Work Location"),
    // body("Manager")
    // .isLength({ min: 1 })
    // .withMessage("please enter a valid Manager"),
  body("WorkCnt")
    .isLength({ min: 1 })
    .withMessage("please enter a valid Work Contact"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({
        status: "fail",
        comment: "login fail, check your body",

        errors: error.array(),
      });
    } else {
      next();
    }
  },
];

module.exports = { EmployeeValidater };
