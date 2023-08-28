const Boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { number } = require('joi');
const People = models.People;
class peopleService{
constructor(){
};
  async create(data){
    try {
      const { name, lastname, email, number } = data;
      if (!name || !lastname || !email || !number) {
        throw Boom.badRequest('Faltan datos obligatorios para crear la persona');
      };
      const createPeople = await People.create({ name, lastname, email, number })
      return createPeople;
    } catch (error) {
      console.error('Erro al crear a la persona', error);
      throw Boom.badImplementation('Error interno al intentar crear a la persona');
    };
  };

  async find(){
    try {
      const people = await People.findAll();
      if (people.length === 0) {
        throw Boom.notFound('Personas no encontrada')
      }
      return people;
    } catch (error) {
      console.error('Error al obtener las personas', error);
      throw Boom.badImplementation('Error interno del servidor')
    }
  };

  async findOne(id){
    try {
      const people = await People.findByPk(id);
      if (people.length === 0) {
        throw Boom.notFound('La persona no encontrada');
      };
      return people;
    } catch (error) {
        console.error('Error al optener la persona', error);
        throw Boom.badImplementation('Error interno del servidor');
    };
  };

  async update(id, changes){
    try {
      const people = await this.findOne(id);
      const { name, lastname, email, number } = changes;
      if (!name && !lastname && !email && !number) {
        throw Boom.badRequest('No se proporcionaron datos para actualizar a la persona')
      }
      const updatePeople = await people.update(changes);
      return updatePeople;
    } catch (error) {
        console.error('Error al actualizar la  persona:', error);
        throw Boom.badImplementation('Error interno al intentar actualizar la persona');
    }
  }

  async delete(id){
    try {
      const people = await this.findOne(id)
      await people.destroy();
      return { message: `Se borró la persona con la id: ${id}`, deletedProductId: id };
    } catch (error) {
      console.error('Error al eliminar la persona:', error);
      throw Boom.badImplementation('Error interno al intentar eliminar la persona');
    };
  };
};

module.exports= peopleService;
