const Boom = require("@hapi/boom");
const { sequelize } = require('../libs/sequelize')

class userService{
constructor(){
  this.users = [];
};
  async create(data){
    const { name, gender, edad } = data;
    if (!name || !gender || !edad) {
      throw Boom.badRequest('Faltan datos obligatorios para crear el producto');
    };
    const user ={
      name,
      gender,
      edad,
    };
    this.users.push(user);
    return user;
  };

  async find(){
    try {
      const query = 'SELECT * FROM users';
      const [ data ] = await sequelize.query(query);
      if (data.length === 0) {
        throw Boom.badRequest('Usuarios no encontrados')
      }
      return data;
    } catch (error) {
      console.error('Erro al optener los usuarios', error);
      throw Boom.badImplementation('Error interno del servidor');
    }
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
