const { faker } = require("@faker-js/faker");
const { use } = require("../routes/people");

class userService{
constructor(){
  this.users = [];
  this.generate();
}

  generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.person.fullName(),
        gender: faker.person.gender(),
        edad: faker.number.int({ min: 18, max: 80 })
      });
    }
  }

  create(){
    const { name, gender, edad } = data;
    const user ={
      id: faker.datatype.uuid(),
      name,
      gender,
      edad,
    }
    this.users.push(user);
    return user;
  }

  find(){
    const user = this.users;
    if (!user) {
      throw new Error('El user no existe');
    }
    return user;
  }

  finOne(id){
    const user = tthis.users.find((item)=> item.id === id);
    if (!user) {
      throw new Error('El user no existe');
    }
    return user;
  };

  update(id, changes){
    const index = this.users.findIndex((item)=> item.id === id);
    if (index === -1) {
      throw new Error('No se encuentra usuario')
    }
    const user = this.users[index];
    this.users[index]={
      ...user,
      ...changes
    }
    return this.users[index];
  }

  delete(id){
    const index = this.users.findIndex((item)=> item.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports= userService;
