const { faker } = require("@faker-js/faker");
const Boom = require("@hapi/boom");

class userService{
constructor(){
  this.users = [];
  this.generate();
};

  generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        gender: faker.person.gender(),
        edad: faker.number.int({ min: 18, max: 80 }),
        isBlock: faker.datatype.boolean(),
      });
    };
  };

  async create(data){
    const { name, gender, edad } = data;
    if (!name || !gender || !edad) {
      throw Boom.badRequest('Faltan datos obligatorios para crear el producto');
    };
    const user ={
      id: faker.string.uuid(),
      name,
      gender,
      edad,
      isBlock: faker.datatype.boolean(),
    };
    this.users.push(user);
    return user;
  };

  async find(){
    const user = this.users;
    if (!user) {
      throw Boom.notFound("User not found");
    };
    return user;
  };

  async finOne(id){
    const user = this.users.find((item)=> item.id === id);
    if (!user) {
      throw Boom.notFound("User not found");
    };
    if(user.isBlock){
      throw Boom.conflict('User is block');
    };
    return user;
  };

  async update(id, changes){
    const index = this.users.findIndex((item)=> item.id === id);
    if (index === -1) {
      throw Boom.notFound("User not found");
    };
    const user = this.users[index];
    if(user.isBlock){
      throw Boom.conflict('User is block');
    };
    const { name, gender, edad } = changes;
    if (!name && !gender && !edad) {
      throw Boom.badRequest('No se proporcionaron datos para actualizar a el usuario')
    }
    this.users[index]={
      ...user,
      ...changes
    };
    return this.users[index];
  };

  async delete(id){
    const index = this.users.findIndex((item)=> item.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    };
    const user = this.users[index];
    if(user.isBlock){
      throw Boom.conflict('User is block');
    };
    this.users.splice(index, 1);
    return { id };
  };
};

module.exports= userService;
