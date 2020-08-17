const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogs");
const queryController = require("./../controllers/queries");
const profileController = require("./../controllers/profile");
const validator = require("./../validation/validate");
const passport = require("passport");

const User = require("./../models/User");
const routeProtector = require("./../validation/routesProtector");

// login and logout enpoint
router.post(
  "/api/user/login",
  passport.authenticate("local"),
  routeProtector.login
),
  router.post("/api/user/logout", routeProtector.logout);

// Queries endpoints
router.get(
  "/api/user/queries",
  routeProtector.protectRoute,
  queryController.findQueries
);
router.post(
  "/api/queries",
  validator.queryValidator,
  queryController.createQuery
);
router.get(
  "/api/queries/:id",
  routeProtector.protectRoute,
  queryController.findQuery
);

// Blogs endpoints

router.get("/api/blogs", blogController.findBlogs);
router.get("/api/user/blogs", blogController.findBlogs);
router.get("/api/blogs/:id", blogController.findBlog);
router.post(
  "/api/user/blogs",
  routeProtector.protectRoute,
  validator.blogValidator,
  blogController.createBlog
);
router.patch(
  "/api/user/blogs/:id",
  routeProtector.protectRoute,
  validator.blogValidator,
  blogController.updateBlog
);
router.delete(
  "/api/user/blogs/:id",
  routeProtector.protectRoute,
  blogController.deleteBlog
);

// update likes
router.put(
  "/api/user/blogs/like/:id",
  routeProtector.protectRoute,
  blogController.updateLikes
);

// comments endpoints
router.post(
  "/api/user/blogs/comment/:id",
  routeProtector.protectRoute,
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
  routeProtector.protectRoute,
  profileController.createProfile
);
router.patch(
  "/api/user/profile/:id",
  routeProtector.protectRoute,
  profileController.updateProfile
);
router.get(
  "/api/user/profile",
  routeProtector.protectRoute,
  profileController.readProfile
);
module.exports = router;

//projects endpoint
router.put(
  "/api/user/profile/projects",
  routeProtector.protectRoute,
  profileController.createProject
);
router.delete(
  "/api/user/profile/projects/:pro_id",
  routeProtector.protectRoute,
  profileController.deleteProject
);
