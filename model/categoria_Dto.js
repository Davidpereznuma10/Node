const Joi = require("joi");

const id = Joi.string().id();
const categoryName = Joi.string();
const description = Joi.string();

const createCategoriaDto = Joi.object({
  categoryName: categoryName.required(),
  description: description.required()
});

const updateCategoriaDto =Joi.object({
  categoryName: categoryName,
  description: description
});

const getCategoriaDto = Joi.object ({
  id: id.required(),
});

module.exports= { createCategoriaDto, getCategoriaDto, updateCategoriaDto }




