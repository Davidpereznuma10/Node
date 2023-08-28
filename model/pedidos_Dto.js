const Joi = require('joi');

const id = Joi.string();
const fechaPedido = Joi.date();
const estado = Joi.string();
const descripcion = Joi.string();

const getPedidoDto = Joi.object({
    id: id.required()
});

const updatePedidoDto = Joi.object({
    fechaPedido: fechaPedido,
    estado: estado,
    descripcion: descripcion
});

const createPedidosDto = Joi.object({
    fechaPedido: fechaPedido.required(),
    estado: estado.required(),
    descripcion: descripcion.required()
});

module.exports = { getPedidoDto, updatePedidoDto, createPedidosDto };
