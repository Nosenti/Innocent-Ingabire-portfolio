const Blog = require("../models/Blog");

exports.findBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.send({ data: blogs });
};

exports.createBlog = async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.send({ data: blog });
};

exports.findBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.send({ data: blog });
  } catch {
    res.status(404).send({ error: "Blog post is not found!" });
  }
};
