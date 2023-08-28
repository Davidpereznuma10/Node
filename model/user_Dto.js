const Joi = require("joi");

const id = Joi.number().integer();
const nameUser = Joi.string();
const password = Joi.string();

const createUserDto = Joi.object({
  nameUser: nameUser.required(),
  password: password.required(),
});

const getUserDto = Joi.object({
  id: id.required(),
});

const updateUserDto = Joi.object({
  nameUser: nameUser,
  password: password,
});

module.exports = { createUserDto, updateUserDto, getUserDto };
