const Joi = require("joi");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const blogs = [
  { id: 1, name: "blog 1" },
  { id: 2, name: "blog 2" },
  { id: 3, name: "blog 3" },
];
app.get("/", (req, res) => {
  res.send("This is the landing page");
});

app.get("/api/blogs", (req, res) => {
  res.send(blogs);
});
app.post("/api/blogs", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const blog = {
    id: blogs.length + 1,
    name: req.body.name,
  };
  blogs.push(blog);
  res.send(blog);
});

app.put("/api/blogs/:id", (req, res) => {
  /**
   * look up the blog post
   * if not existing, return 404
   * validate
   * if invalid, return 400 - Bad request
   * update blog post
   * return the updated blog post
   */
  let blog = blogs.find((b) => b.id === parseInt(req.params.id));
  if (!blog)
    return res.status(404).send("The blog with that id does not exist");

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  // update blog
  blog.name = req.body.name;
  res.send(blog);
});

app.delete("/api/blogs/:id", (req, res) => {
  // look up the blog post
  // NOt existing, return 404
  let blog = blogs.find((b) => b.id === parseInt(req.params.id));
  if (!blog) {
    res.status(404).send("The blog with that id does not exist");
    return;
  }
  // Delete
  const index = blogs.indexOf(blog);
  blogs.splice(index, 1);

  // Return the same blog post
  res.send(blog);
});

app.get("/api/blogs/:id", (req, res) => {
  let blog = blogs.find((b) => b.id === parseInt(req.params.id));
  if (!blog)
    return res.status(404).send("The blog with that id does not exist");
  res.send(blog);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on the port ${port}`);
});
