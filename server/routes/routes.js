const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogs");
const queryController = require("./../controllers/queries");
const loginController = require("./../controllers/user");
const profileController = require("./../controllers/profile");
const validator = require("./../validation/validate");

const User = require("./../models/User");
const routeProtector = require("./../validation/routesProtector");

// login enpoint
router.post("/api/user/login", loginController.login),
  // Queries endpoints
  router.get(
    "/api/user/queries",
    // routeProtector.protectRoute,
    routeProtector.authenticateToken,
    queryController.findQueries
  );
router.post(
  "/api/queries",
  validator.queryValidator,
  queryController.createQuery
);
router.get(
  "/api/queries/:id",
  routeProtector.authenticateToken,
  queryController.findQuery
);

// Blogs endpoints

router.get("/api/blogs", blogController.findBlogs);
router.get("/api/user/blogs", blogController.findBlogs);
router.get("/api/blogs/:id", blogController.findBlog);
router.post(
  "/api/user/blogs",
  routeProtector.authenticateToken,
  validator.blogValidator,
  blogController.createBlog
);
router.patch(
  "/api/user/blogs/:id",
  routeProtector.authenticateToken,
  validator.blogValidator,
  blogController.updateBlog
);
router.delete(
  "/api/user/blogs/:id",
  routeProtector.authenticateToken,
  blogController.deleteBlog
);

// update likes
router.put(
  "/api/user/blogs/like/:id",
  routeProtector.authenticateToken,
  blogController.updateLikes
);

// comments endpoints
router.post(
  "/api/user/blogs/comment/:id",
  validator.commentValidator,
  blogController.createComment
);
// router.delete(
//   "/api/user/blogs/comment/:id/:comment_id",
//   routeProtector.protectRoute,
//   blogController.deleteComment
// );

// profile endpoint
router.post(
  "/api/user/profile",
  routeProtector.authenticateToken,
  profileController.createProfile
);
router.patch(
  "/api/user/profile/:id",
  routeProtector.authenticateToken,
  profileController.updateProfile
);
router.get(
  "/api/user/profile",
  routeProtector.authenticateToken,
  profileController.readProfile
);
module.exports = router;

//projects endpoint
router.put(
  "/api/user/profile/projects",
  routeProtector.authenticateToken,
  profileController.createProject
);
router.delete(
  "/api/user/profile/projects/:pro_id",
  routeProtector.authenticateToken,
  profileController.deleteProject
);
