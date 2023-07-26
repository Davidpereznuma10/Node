const { faker } = require('@faker-js/faker');
const Boom = require('@hapi/boom');

class peopleService{
constructor(){
  this.peoples=[];
  this.generate();
};

  generate(){
    const limit = 20;
    for (let i = 0; i < limit; i++) {
      this.peoples.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        zodiaco: faker.person.zodiacSign(),
        edad: faker.number.int({min:18 ,max: 80}),
        isBlock: faker.datatype.boolean(),
      });
    };
  };


  async create(data){
    const { name, zodiaco, edad } =data;
    if (!name || !zodiaco || !edad) {
      throw Boom.badRequest('Faltan datos obligatorios para crear la persona');
    };
    const people = {
      id: faker.string.uuid(),
      name,
      zodiaco,
      edad,
      isBlock: faker.datatype.boolean(),
    };
    this.peoples.push(people);
    return people;
  }

  async find(){
    const people = this.peoples
    if (!people) {
      throw Boom.notFound('La persona no existe');
    };
    return people;
  };

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
