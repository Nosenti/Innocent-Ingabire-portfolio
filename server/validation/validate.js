const Joi = require("joi");

exports.queryValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(10).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      status: 400,
      error: `${result.error.details[0].message}`,
    });
  }
  next();
};
exports.blogValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      status: 400,
      error: `${result.error.details[0].message}`,
    });
  }
  next();
};
exports.commentValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    text: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      status: 400,
      error: `${result.error.details[0].message}`,
    });
  }
  next();
};
