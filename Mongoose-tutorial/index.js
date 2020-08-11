const express = require("express");
const mongoose = require("mongoose");

const bookController = require("./controllers/posts");

mongoose
  .connect("mongodb://localhost:27017/express-mongoose", {
    useNewUrlParser: true,
  })
  .then(() => {
    const app = express();
    app.use(express.json());

    app.get("/posts", bookController.findPosts);
    app.post("/posts", bookController.createPost);
    app.get("/posts/:id", bookController.findPost);
    app.patch("/posts/:id", bookController.updatePost);
    app.delete("/posts/:id", bookController.deletePost);

    app.listen(8000, () => {
      console.log("Server has started at port 8000");
    });
  })
  .catch(() => {
    console.log("Database connection failed!");
  });
