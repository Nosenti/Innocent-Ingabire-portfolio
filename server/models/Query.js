const mongoose = require("mongoose");
const { truncate } = require("fs");
const Joi = require("joi");

// const joiSchema = Joi.object().keys({
//   name: Joi.string().min(3).required(),
//   email: Joi.string().min(3).required(),
//   message: Joi.string().min(3).required(),
//   createdAt: Joi.date(),
// });

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
