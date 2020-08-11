const express = require("express");
const mongoose = require("mongoose");

const postController = require("./controllers/posts");

mongoose
  .connect("mongodb://localhost:27017/innocent-portfolio", {
    useNewUrlParser: true,
  })
  .then(() => {
    const app = express();
    app.use(express.json());

    app.get("/api/posts", postController.findPosts);
    app.post("/api/posts", postController.createPost);
    app.get("/api.posts/:id", postController.findPost);

    app.listen(8000, () => {
      console.log("Server has started at port 8000");
    });
  })
  .catch(() => {
    console.log("Database connection failed!");
  });
