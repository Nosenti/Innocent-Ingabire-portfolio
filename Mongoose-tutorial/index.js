const express = require("express");
const Post = require("./models/Post");
const mongoose = require("mongoose");
const router = express.Router();
const routes = require("./routes");

mongoose
  .connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use("/api", routes);
    app.get("/", (req, res) => {
      res.send("Hello, World");
    });

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });
// Get all posts
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});
module.exports = router;
