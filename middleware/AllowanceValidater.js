const { body, validationResult } = require("express-validator");

const AllowanceValidater = [
  // body("AllowanceID")
  //   .isLength({ min: 1 })
  //   .withMessage("please enter avalid ID address"),
  body("AllowanceName")
    .isLength({ min: 1 })
    .withMessage("please enter avalid department"),
    body("AllowanceAmount")
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

module.exports = { AllowanceValidater };
