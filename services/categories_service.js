const { faker } = require('@faker-js/faker');

class categoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        categoriesId: faker.datatype.uuid(),
        categorias: faker.color.rgb(),
      });
    }
  }

  async create(data) {
    const { categoria } = data;
    const category = {
      categoriesId: faker.datatype.uuid(),
      categoria,
    };
    this.categories.push(category);
    return category;
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    return this.categories.find((e) => e.categoriesId === id);
  }

  async addProductsToCategory(id, products) {
    const index = this.categories.findIndex((e) => e.categoriesId === id);
    if (index === -1) {
      throw new Error('Categoría no encontrada');
    }
    const categoria = this.categories[index];
    categoria.products = products;
    return categoria;
  }

  async update(id, changes) {
    const index = this.categories.findIndex((e) => e.categoriesId === id);
    if (index === -1) {
      throw new Error('Categoría no encontrada');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes,
    };
    return this.categories[index];
  }

  async deleteOne(categoriesId) {
    const index = this.categories.findIndex((e) => e.categoriesId === categoriesId);
    if (index === -1) {
      throw new Error('Categoría no encontrada');
    }
    this.categories.splice(index, 1);
    return { categoriesId };
  }
}

module.exports = categoriesService;
