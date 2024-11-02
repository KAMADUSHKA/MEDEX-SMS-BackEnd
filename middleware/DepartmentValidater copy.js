const { body, validationResult } = require("express-validator");

const DepartmentValidater = [
  body("departmentID")
    .isLength({ min: 1 })
    .withMessage("please enter avalid ID address"),
  body("department")
    .isLength({ min: 1 })
    .withMessage("please enter avalid department"),
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

module.exports = { DepartmentValidater };
