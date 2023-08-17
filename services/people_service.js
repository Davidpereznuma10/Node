const Boom = require('@hapi/boom');
const { pool } = require('../libs/postgres');

class peopleService{
constructor(){
  this.peoples=[];
  this.pool = pool;
};
  async create(data){
    const { name, zodiaco, edad } =data;
    if (!name || !zodiaco || !edad) {
      throw Boom.badRequest('Faltan datos obligatorios para crear la persona');
    };
    const people = {
      name,
      zodiaco,
      edad,
    };
    this.peoples.push(people);
    return people;
  }

  async find(){
  try {
    const query = 'SELECT * FROM people';
    const rta = await this.pool.query(query);
    if (rta.rows.length === 0) {
      throw Boom.notFound('Personas no encontrada')
    }
    return rta;
  } catch (error) {
    console.error('Error al obtener las personas', error);
    throw Boom.badImplementation('Error interno del servidor')
  }};

  async findOne(id){
    const people = this.peoples.find((item)=> item.id === id);
    if (!people) {
      throw Boom.notFound('La persona no existe');
    };
    if (people.isBlock) {
      throw Boom.conflict('People is blocked');
    };
    return people;
  };

  async update(id, changes){
    const index = this.peoples.findIndex((item)=> item.id === id);
    if (index === -1) {
      throw Boom.notFound('La persona no existe');
    };
    const people = this.peoples[index];
    if (people.isBlock) {
      throw Boom.conflict('People is blocked');
    };
    const { name, zodiaco, edad} = changes;
    if (!name && !zodiaco && !edad) {
      throw Boom.badRequest('No se proporcionaron datos para actualizar a la persona')
    }
    this.peoples[index]={
      ...people,
      ...changes,
    };
    return this.peoples[index];
  }

  async delete(id){
    const index = this.peoples.findIndex((item) => item.id === id);
    if (index === -1) {
      throw Boom.notFound('La persona no existe');
    };
    const people = this.peoples[index];
    if (people.isBlock) {
      throw Boom.conflict('People is block');
    };
    this.peoples.splice(index, 1);
    return { id };
  };
};

module.exports= peopleService;
