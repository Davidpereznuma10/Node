const { faker } = require('@faker-js/faker');
const Boom = require('@hapi/boom');

class categoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  };

  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.string.uuid(),
        categorias: faker.color.rgb(),
        isBlock: faker.datatype.boolean(),
      });
    };
  };

  async create(data) {
    const { categorias } = data;
    if (!categorias) {
      throw Boom.badRequest('Faltan datos obligatorios para crear la categoría');
    };
    const categoria = {
      id: faker.datatype.uuid(),
      categorias,
      isBlock: faker.datatype.boolean(),
    };
    this.categories.push(categoria);
    return categoria;
  };


  async find() {
    const categoria = this.categories;
    if (!categoria) {
      throw Boom.notFound('Categoría no encontrada');
    };
    return categoria;
  };

  async findOne(id) {
    const categoria = this.categories.find((e) => e.id === id);
    if (!categoria) {
      throw new Error('Categoría no encontrada');
    };
    if(categoria.isBlock){
      throw Boom.conflict('Category is blocked');
    };
    return categoria;
  };


  async addProductsToCategory(id, products) {
    const index = this.categories.findIndex((e) => e.id === id);
    if (index === -1) {
      throw Boom.notFound('category not found');
    };
    const categoria = this.categories[index];
    if (categoria.isBlock) {
      throw Boom.conflict('Category is blocked');
    };
    categoria.products = products;
    return categoria;
  };

  async update(id, changes) {
    const index = this.categories.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error('Categoría no encontrada');
    };
    const categoria = this.categories[index];
    if (categoria.isBlock) {
      throw Boom.conflict('Category is blocked');
    };
    const { categorias } = changes;
    if (!categorias) {
      throw Boom.badRequest('No se proporcionaron datos para actualizar la categoría');
    }
    this.categories[index] = {
      ...categoria,
      ...changes,
    };
    return this.categories[index];
  };

  async delete(id) {
    const index = this.categories.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error('Categoría no encontrada');
    };
    const categoria = this.categories[index];
    if (categoria.isBlock) {
      throw Boom.conflict('Category is blocked');
    };
    this.categories.splice(index, 1);
    return { id };
  };
};

module.exports = categoriesService;
