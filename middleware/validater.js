const { body, validationResult } = require("express-validator");

const validater = [
  body("email").isEmail().withMessage("please enter avalid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at 8 characters long"),
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

module.exports = { validater };
