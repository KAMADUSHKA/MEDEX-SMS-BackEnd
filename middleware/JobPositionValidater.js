const { body, validationResult } = require("express-validator");

const JobPositionValidater = [
  // body("JobPositionID")
  //   .isLength({ min: 1 })
  //   .withMessage("please enter avalid ID address"),
  body("JobTitle")
    .isLength({ min: 1 })
    .withMessage("please enter avalid jobTitle"),
    body("DepartmentName")
    .isLength({ min: 1 })
    .withMessage("please enter avalid department name"),
    body("NumberOfEmployees")
    .isLength({ min: 1 })
    .withMessage("please enter avalid numberOf employees"),
    body("Reporting")
    .isLength({ min: 1 })
    .withMessage("please enter avalid Reporting"),
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

module.exports = { JobPositionValidater };
