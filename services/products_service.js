const Boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const Product = models.Product;
class ProductsService {

  async create(data) {
    try {
      const { productName, price, description, stock } = data;
      if (!productName || !price || !description || !stock) {
        throw Boom.badRequest('Faltan datos obligatorios para crear el producto');
      };
      const createdProduct = await Product.create({ productName, price, description, stock });
      return createdProduct;
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw Boom.badImplementation('Error interno al intentar crear el producto');
    }
  };

  async find() {
    try {
      const product = await Product.findAll()
      if (product.length === 0) {
        throw Boom.notFound('No hay productos')
      }
      return product;
    } catch (error) {
        console.error('Error al optener los productos', error);
        throw Boom.badImplementation('Error interno del servidor');
    }
  };

  async findOne(id) {
    try  {
      const product = await Product.findByPk(id)
      if (product.length === 0) {
        throw Boom.notFound('Producto no encontrado');
      };
      return product;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw Boom.badImplementation('Error interno al obtener el producto');
    }
  };

  async update(id, changes) {
    try {
      const product = await this.findOne(id);
      const { productName, price, description, stock } = changes;
      if (!productName && !price && !description && !stock)   {
        throw Boom.badRequest('No se proporcionaron datos para actualizar el prodcuto');
      };
      const updateProduct = await product.update(changes);
      return updateProduct;
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw Boom.badImplementation('Error interno al intentar actualizar el producto');
    };
  };

  async delete(id) {
    try {
      const product = await this.findOne(id)
      await product.destroy();
      return { message: `Se borró el producto con la id: ${id}`, deletedProductId: id }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw Boom.badImplementation('Error interno al intentar eliminar el producto');
    };
  };
};

module.exports = ProductsService;

