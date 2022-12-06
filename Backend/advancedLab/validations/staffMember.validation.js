const { number } = require("joi");
const Joi = require("joi");

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const logoutValidation = Joi.object({
  token: Joi.string().required(),
});

const viewMyProfileValidation = Joi.object({
  token: Joi.string().required(),
});
const resetPasswordValidation = Joi.object({
  old_password: Joi.string().required(),
  password: Joi.string().required(),
  password_confirmation: Joi.string().valid(Joi.ref("password")).required(),
});
const updateMyProfileValidation = Joi.object({
  email: Joi.string().email(),
  salary: Joi.number(),
});

const viewAttendanceValidation = Joi.object({
  month: Joi.number().min(1).max(12),
  year: Joi.number().min(1),
});

module.exports = {
  logoutValidation: logoutValidation,
  loginValidation: loginValidation,
  viewMyProfileValidation: viewMyProfileValidation,
  resetPasswordValidation: resetPasswordValidation,
  updateMyProfileValidation: updateMyProfileValidation,
  viewAttendanceValidation: viewAttendanceValidation,
};