const Post = require("../models/Post");

exports.findPosts = async (req, res) => {
  const posts = await Post.find();
  res.send({ data: posts });
};

exports.createPost = async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send({ data: post });
};

exports.findPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send({ data: post });
  } catch {
    res.status(404).send({ error: "Post is not found!" });
  }
};
