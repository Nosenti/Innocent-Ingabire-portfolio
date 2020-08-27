import mongoose from "mongoose";
import "mongoose-type-url";

const schema = mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
  },
  content: {
    type: String,
    minlength: 3,
  },
  image: mongoose.SchemaTypes.Url,
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {},
      text: {
        type: String,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", schema);
