const Joi = require("joi");

const id = Joi.string().id();
const name = Joi.string();
const lastname = Joi.string();
const email = Joi.string().email();
const number = Joi.number();


const createPeopleDto= Joi.object({
  name : name.required(),
  lastname: lastname.required(),
  email: email.required(),
  number : number.required()
});

const getPeopleDto=Joi.object({
  id: id.required(),
});

const updatePeopleDto=Joi.object({
  name : name,
  lastname: lastname,
  email: email,
  number: number
});


module.exports  = { createPeopleDto, getPeopleDto, updatePeopleDto }
