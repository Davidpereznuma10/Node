const Boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize');

class categoriesService {
  constructor() {
    this.categories = [];
  };

  async create(data) {
    const { categorias } = data;
    if (!categorias) {
      throw Boom.badRequest('Faltan datos obligatorios para crear la categoría');
    };
    const categoria = {
      categorias,
    };
    this.categories.push(categoria);
    return categoria;
  };

  async find() {
  try {
    const query = 'SELECT * FROM categories';
    const [ data ] = await sequelize.query(query);
    if (data.length === 0) {
      throw Boom.notFound('Categorías no encontradas');
    }
    return data;
  } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw Boom.badImplementation('Error interno del servidor');
    }
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
