import express from "express";
const router = express.Router();
import blogController from "../controllers/blogs";
import queryController from "./../controllers/queries";
import loginController from "./../controllers/user";
import profileController from "./../controllers/profile";
import validator from "./../validation/validate";
import routeProtector from "./../validation/routesProtector";

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.post("/api/user/login", loginController.login),
  router.get(
    "/api/user/queries",

    routeProtector.authenticateToken,
    queryController.findQueries
  );
router.post(
  "/api/queries",
  validator.queryValidator,
  queryController.createQuery
);
router.get(
  "/api/user/queries/:id",
  routeProtector.authenticateToken,
  queryController.findQuery
);

/**
 * @swagger
 * /api/blogs:
 *  get:
 *    description: get a list of all posts
 *    responses:
 *      '200':
 *        description: A successful response
 */

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

router.put(
  "/api/blogs/like/:id",
  routeProtector.authenticateToken,
  blogController.updateLikes
);

router.post(
  "/api/blogs/comment/:id",
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
// router.patch(
//   "/api/user/profile/:id",
//   routeProtector.authenticateToken,
//   profileController.updateProfile
// );
router.get(
  "/api/user/profile",
  routeProtector.authenticateToken,
  profileController.readProfile
);

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

module.exports = router;
