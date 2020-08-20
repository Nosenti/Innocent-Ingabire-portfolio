const Blog = require("../models/Blog");
const { post } = require("../routes/routes");
const User = require("../models/User");

exports.findBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).send({
    data: blogs,
  });
};

exports.createBlog = async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.status(200).send({ data: blog });
};

exports.findBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).send({ data: blog });
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
    res.status(200).send({ status: "Blog is deleted" });
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
    res.status(200).send(blog.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Server Error" });
  }
};

// add comments
exports.createComment = async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select("-password");
    const blog = await Blog.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: req.body.name,
      // avatar: user.avatar,
      // user: req.user.id,
    };
    blog.comments.unshift(newComment);
    await blog.save();
    res.status(200).send({
      status: 200,
      message: "Comment added",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Server Error" });
  }
};
// exports.deleteComment = async (req, res) => {
//   try {
//     // const user = await User.findById(req.user.id).select("-password");
//     const blog = await Blog.findById(req.params.id);
//     const comment = blog.comments.find(
//       (comment) => comment.id === req.params.comment_id
//     );

//     // Make sure the comment exists
//     if (!comment) {
//       res.status(404).send({ status: "Comment not found" });
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send({ error: "Server Error" });
//   }
// };
