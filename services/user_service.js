const Boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const User = models.User;

class UserService {
  async create(data) {
    try {
      const { nameUser, password } = data;
      if (!nameUser || !password) {
        throw Boom.badRequest('Faltan datos obligatorios para crear el usuario');
      };
      const createdUser = await User.create({ nameUser, password });
      return createdUser;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw Boom.badImplementation('Error interno al intentar crear el usuario');
    }
  }

  async find() {
    try {
      const users = await User.findAll();
      if (users.length === 0) {
        throw Boom.notFound('Usuarios no encontrados');
      }
      return users;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw Boom.badImplementation('Error interno al obtener los usuarios');
    }
  }

  async findOne(id) {
    try {
      const user = await User.findByPk(id);
      if (users.length === 0) {
        throw Boom.notFound('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      throw Boom.badImplementation('Error interno al obtener el usuario');
    }
  }

  async update(id, changes) {
    try {
      const user = await this.findOne(id);
      const { nameUser, password } = changes;
      if (!nameUser && !password) {
        throw Boom.badRequest('No se proporcionaron datos para actualizar al usuario');
      }
      const updatedUser = await user.update(changes);
      return updatedUser;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw Boom.badImplementation('Error interno al intentar actualizar el usuario');
    }
  }

  async delete(id) {
    try {
      const user = await this.findOne(id);
      await user.destroy();
      return { message: `Se borró el usuario con la id: ${id}`, deletedProductId: id };
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw Boom.badImplementation('Error interno al intentar eliminar el usuario');
    }
  }
}

module.exports = UserService;
