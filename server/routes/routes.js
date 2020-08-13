const express = require("express");
const router = express.Router();
const postController = require("./../controllers/posts");
const queryController = require("./../controllers/queries");
const validator = require("./../validation/validate");

router.get("/api/queries", queryController.findQueries);
router.post(
  "/api/queries",
  validator.queryValidator,
  queryController.createQuery
);
router.get("/api/queries/:id", queryController.findQuery);

router.get("/api/posts", postController.findPosts);
router.post("/api/posts", validator.postValidator, postController.createPost);
router.get("/api/posts/:id", postController.findPost);

module.exports = router;
