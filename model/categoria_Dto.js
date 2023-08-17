const { Boom } = require("@hapi/boom");
const Joi = require("joi");

function validateColor(value, helpers) {
  // Validar si es un nombre de color estándar o un valor hexadecimal
  if (/^#[0-9A-Fa-f]{6}$/.test(value) || /^(red|blue|green|yellow|purple|pink|orange|black|white)$/.test(value)) {
    return value;
  } else {
    throw Boom.badRequest('No es un rgb');
  }
}


const id = Joi.string().id();
const categorias = Joi.string().custom(validateColor, 'Color validation');

const createCategoriaDto = Joi.object({
  categorias: categorias.required(),
});

const updateCategoriaDto =Joi.object({
  id: categorias,
});

const getCategoriaDto = Joi.object ({
  id: id.required(),
});

module.exports= { createCategoriaDto, getCategoriaDto, updateCategoriaDto }




