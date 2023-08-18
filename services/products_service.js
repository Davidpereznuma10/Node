const Boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize')

class ProductsService {

  constructor(){
    this.products = [];
  };

  async create(data) {
    const { name, price, image } = data;
    if (!name || !price || !image) {
      throw Boom.badRequest('Faltan datos obligatorios para crear el producto');
    };
    const product = {
      name,
      price,
      image,
    };
    this.products.push(product);
    return product;
  };

  async find() {
  try {
    const query = 'SELECT * FROM products';
    const [ data ]  = await sequelize.query(query);
    if (data.length === 0) {
      throw Boom.notFound('Productos no encontrados')
    }
    return data;
  } catch (error) {
    console.error('Error al optener los productos', error);
    throw Boom.badImplementation('Error interno del servidor');
  }
  };

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw Boom.notFound('Product not found');
    };
    if (product.isBlock) {
      throw Boom.conflict('Product is blocked');
    };
    return product;
  };

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw Boom.notFound("Product not found");
    };
    const product = this.products[index];
    if (product.isBlock) {
      throw Boom.conflict('Product is blocked');
    };
    const { name, price, image } = changes;
    if (!name && !price && !image) {
      throw Boom.badRequest('No se proporcionaron datos para actualizar el prodcuto');
    }
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw Boom.notFound("Product not found");
    };
    const product = this.products[index];
    if (product.isBlock) {
      throw Boom.conflict('Product is blocked');
    };
    this.products.splice(index, 1);
    return { id };
  };
};

module.exports = ProductsService;

