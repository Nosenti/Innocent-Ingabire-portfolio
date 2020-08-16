const Blog = require("./../models/Blog");
const blogController = require("../controllers/blogs");
const queryController = require("./../controllers/queries");
const validator = require("./../validation/validate");
const passport = require("passport");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");

exports.protectRoute = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send({ message: "Unauthorized access." });
  }
  next();
};

exports.login = async (req, res) => {
  req.login(req.body, (error) => {
    const admin = User.findOne({
      email: req.body.email,
    });
    const token = jwt.sign({ admin: User }, "nosenti");

    if (error) res.send(error);
    else {
      res.status(200).send({
        status: 200,
        token: token,
      });
    }
  });
};

exports.logout = async (req, res) => {
  req.logout();
  res.send({ message: "logged out successfully" });
};
