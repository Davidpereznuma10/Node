const { faker } = require("@faker-js/faker");

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
    return this.users;
  }

  finOne(id){
    return this.users.find((item)=> item.id === id)
  }

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