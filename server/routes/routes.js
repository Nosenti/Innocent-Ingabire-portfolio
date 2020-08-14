const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogs");
const queryController = require("./../controllers/queries");
const validator = require("./../validation/validate");
const passport = require("passport");

router.get("/api/queries", queryController.findQueries);
router.post(
  "/api/queries",
  validator.queryValidator,
  queryController.createQuery
);

router.get("/api/queries/:id", queryController.findQuery);

router.get("/api/blogs", blogController.findBlogs);
router.post("/api/blogs", validator.blogValidator, blogController.createBlog);
router.get("/api/blogs/:id", blogController.findBlog);
router.patch("/api/blogs/:id", blogController.updateBlog);
router.delete("/api/blogs/:id", blogController.deleteBlog);

router.post("/api/user/login", passport.authenticate("local"), (req, res) => {
  req.login(req.body, (error) => {
    if (error) res.send(error);
    else {
      res.send({
        message: "Logged in successfully",
        user: req.user,
      });
    }
  });
}),
  router.post("/api/user/logout", (req, res) => {
    req.logout();
    res.send({ message: "logged out successfully" });
  });

router.patch(
  "/api/user/blogs/:id",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send({ message: "Unauthorized access." });
    }
  },
  blogController.updateBlog
);
router.delete(
  "/api/user/blogs/:id",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send({ message: "Unauthorized access." });
    }
  },
  blogController.deleteBlog
);
router.get(
  "/api/user/blogs",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send({ message: "Unauthorized access." });
    }
  },
  blogController.findBlogs
);
router.post(
  "/api/user/blogs",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send({ message: "Unauthorized access." });
    }
  },
  blogController.createBlog
);
module.exports = router;
