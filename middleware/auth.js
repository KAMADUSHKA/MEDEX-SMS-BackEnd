const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (token == null) res.sendStatus(401);
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) res.sendStatus(401);
        req.user = user;
        next();
      });
    } else res.sendStatus(401);
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};
