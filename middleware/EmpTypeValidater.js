const { body, validationResult } = require("express-validator");

const EmpTypeValidater = [
  // body("EmploymentTypeID").isLength({ min: 1 }).withMessage("please enter avalid ID address"),
  body("EmploymentType")
    .isLength({ min: 1 })
    .withMessage("please enter avalid employment type"),
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

module.exports = { EmpTypeValidater };
