const Joi = require('joi');

const id = Joi.string().id();
const productName = Joi.string();
const price = Joi.number();
const stock = Joi.number();
const description = Joi.string();

const createProductDto = Joi.object({
  productName: productName.required(),
  description: description.required(),
  price: price.required(),
  stock: stock.required()
});

const updateProductDto = Joi.object({
  productName: productName,
  description, description,
  price: price,
  stock: stock
});

const getProductDto = Joi.object({
  id: id.required(),
});

module.exports = { createProductDto, updateProductDto, getProductDto }
