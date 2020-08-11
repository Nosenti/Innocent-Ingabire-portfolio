const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
  },
  content: {
    type: String,
    minlength: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", schema);
