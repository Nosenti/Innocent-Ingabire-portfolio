const Blog = require("./../models/Blog");
const blogController = require("../controllers/blogs");
const queryController = require("./../controllers/queries");
const loginController = require("./../controllers/user");
const validator = require("./../validation/validate");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");

exports.authenticateToken = async (req, res, next) => {
  const tokenContent = req.headers.authorization;
  let token;
  if (tokenContent != undefined) {
    token = tokenContent.split(" ")[1];
  } else {
    return res.send({
      message: "No token provided",
    });
  }
  if (!token)
    return res.status(401).send({
      status: 401,
      message: "Not authorized",
    });
  jwt.verify(token, "nosenti", (err, user) => {
    if (err)
      return res.status(403).send({
        status: 403,
      });
    req.user = user;
    next();
  });
};
