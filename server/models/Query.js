import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },

  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  message: {
    type: String,
    minlength: 3,
    maxlength: 1000,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Query", schema);
