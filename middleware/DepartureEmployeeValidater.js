const { body, validationResult } = require("express-validator");

const DepartureEmployeeValidater = [
  // body("EmpID").isLength({ min: 1 }).withMessage("please enter avalid ID address"),
  body("DepartureReason")
    .isLength({ min: 1 })
    .withMessage("please enter avalid departure reason"),
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

module.exports = { DepartureEmployeeValidater };
