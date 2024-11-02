const { body, validationResult } = require("express-validator");

const WorkingLocationValidater = [
  // body("workingLocationID")
  //   .isLength({ min: 1 })
  //   .withMessage("please enter avalid ID address"),
  body("workingLocation")
    .isLength({ min: 1 })
    .withMessage("please enter avalid workingLocation"),
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

module.exports = {WorkingLocationValidater };
