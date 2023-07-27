const Joi = require("joi");

const id = Joi.string().uuid();
const name = Joi.string();
const gender = Joi.string();
const edad = Joi.number().min(18);

const createUserDto = Joi.object ({
  name : name.required(),
  gender: gender.required(),
  edad: edad.required(),
});

const getUserDto= Joi.object({
  id:id.required(),
});

const updateUserDto = Joi.object({
  name : name,
  gender: gender,
  edad: edad,
})


module.exports = { createUserDto, updateUserDto, getUserDto }
