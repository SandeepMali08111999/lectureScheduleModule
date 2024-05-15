const joi = require("joi");

exports.userRegisterValidate = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).alphanum().required(),
    role: joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

exports.userLoginValidate = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).alphanum().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};
