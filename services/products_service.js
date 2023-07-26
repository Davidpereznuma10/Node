const { faker } = require('@faker-js/faker');
const Boom = require('@hapi/boom');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  };

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    };
  };

  async create(data) {
    const { name, price, image } = data;
    if (!name || !price || !image) {
      throw Boom.badRequest('Faltan datos obligatorios para crear el producto');
    };
    const product = {
      id: faker.string.uuid(),
      name,
      price,
      image,
      isBlock: faker.datatype.boolean(),
    };
    this.products.push(product);
    return product;
  };

  async find() {
    const product = this.products;
    if (!product) {
      throw Boom.notFound("Product not found");
    };
    return product;
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

