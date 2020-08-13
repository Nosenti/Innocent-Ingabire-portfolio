const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogs");
const queryController = require("./../controllers/queries");
const validator = require("./../validation/validate");

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

module.exports = router;
