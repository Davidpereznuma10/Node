const Boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const Category = models.Category;

class categoriesService {

  async create(data) {
    try {
      const { categoryName, description } = data;
      if (!categoryName || !description) {
        throw Boom.badRequest('Faltan datos obligatorios para crear la categoría');
      };
      const createCategory = await Category.create({ categoryName, description })
      return createCategory;
    } catch (error) {
        console.error('Error al crear el pedido: ', error);
        throw Boom.badImplementation('Error interno en el servidor');
    }
  };

  async find() {
  try {
    const category = await Category.findAll();
    if (category.length === 0) {
      throw Boom.notFound('Categorías no encontradas');
    }
    return category;
  } catch (error) {
      console.error('Error al obtener las categorías:', error);
      throw Boom.badImplementation('Error interno del servidor');
    }
  };

  async findOne(id) {
    try {
      const category = await Category.findByPk(id)
      if (category.length === 0) {
        throw Boom.notFound('Categoría no encontrada');
      }
      return category;
    } catch (error) {
      console.error('Error al optener la categoria', error);
      throw Boom.badImplementation('Error interno en el servidor');
    }
  };

  // async addProductsToCategory(id, products) {
  //   const index = this.categories.findIndex((e) => e.id === id);
  //   if (index === -1) {
  //     throw Boom.notFound('category not found');
  //   };
  //   const categoria = this.categories[index];
  //   categoria.products = products;
  //   return categoria;
  // };

  async update(id, changes) {
    try {
      const category =await this.findOne(id);
      const { categoryName, description} = changes
      if ( !categoryName && !description ) {
        throw Boom.badImplementation('no se proporcionan datos para actualizar la categoria')
      }
      const updateCategory = await category.update(changes)
      return updateCategory;
    } catch (error) {
        console.error('Error al actualizar la categoria:', error);
        throw Boom.badImplementation('Error interno en el servidor');
    }
  };

  async delete(id) {
    try {
      const category = await this.findOne(id);
      await category.destroy();
      return { message: `Se borró la categoria con la id: ${id}`, deletedProductId: id  }
    } catch (error) {
        console.error('Error al eliminar la categoria:', error);
        throw Boom.badImplementation('Error interno en el servidor');
    }
  };
};

module.exports = categoriesService;
