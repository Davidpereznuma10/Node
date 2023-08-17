const Joi = require("joi");

const id = Joi.string().id();
const name = Joi.string();
const zodiaco = Joi.string();
const edad = Joi.number().min(18);

const createPeopleDto= Joi.object({
  name : name.required(),
  zodiaco: zodiaco.required(),
  edad: edad.required(),
});

const getPeopleDto=Joi.object({
  id: id.required(),
});

const updatePeopleDto=Joi.object({
  name : name,
  zodiaco: zodiaco,
  edad: edad,
});


module.exports  = { createPeopleDto, getPeopleDto, updatePeopleDto }
