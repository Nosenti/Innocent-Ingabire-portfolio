const Blog = require("../models/Blog");
const { post } = require("../routes/routes");

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

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    Object.assign(blog, req.body);
    blog.save();
    res.send({ data: blog });
  } catch {
    res.status(404).send({ error: "Blog is not found!" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    await blog.remove();
    res.send({ status: "Blog is deleted" });
  } catch {
    res.status(404).send({ error: "Blog is not found!" });
  }
};

// update likes
exports.updateLikes = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    //check if it has been liked
    if (blog.likes.filter((like) => like.user === req.user.id).length > 0) {
      return res.status(400).send({ status: "Post already liked" });
    }
    blog.likes.unshift({ user: req.user.id });
    await blog.save();
    res.send(blog.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Server Error" });
  }
};
