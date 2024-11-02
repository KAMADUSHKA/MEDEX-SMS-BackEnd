const { body, validationResult } = require("express-validator");

const SalaryValidater = [
  body("EmpName")
    .isLength({ min: 1 })
    .withMessage("please enter avalid Employee Name"),
  body("BasicSalary")
    .isLength({ min: 1 })
    .withMessage("please enter avalid Basic Salary"),
    body("TotalAllowance")
    .isLength({ min: 1 })
    .withMessage("please enter avalid Total Allowance"),
  body("TotalSalary")
    .isLength({ min: 1 })
    .withMessage("please enter avalid Total Salary"),
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

module.exports = { SalaryValidater };
