const { faker } = require('@faker-js/faker');

class peopleService{
constructor(){
  this.peoples=[];
  this.generate();
}

  generate(){
    const limit = 20;
    for (let i = 0; i < limit; i++) {
      this.peoples.push({
        id: faker.datatype.uuid(),
        name: faker.person.firstName(),
        zodiaco: faker.person.zodiacSign(),
        edad: faker.number.int({min:18 ,max: 80}),
      });
    }
  }


  async create(){
    const { name, zodiaco, edad } =data;
    const people = {
      id: faker.datatype.uuid(),
      name,
      zodiaco,
      edad,
    };
    this.peoples.push(people);
    return people;
  }

  async find(){
    const people = this.peoples
    if (!people) {
      throw new Error('La persona no existe');
    }
    return people;
  }

  async findOne(id){
    const people = this.peoples.find((item)=> item.id === id);
    if (!people) {
      throw new Error('La persona no existe');
    }
    return people;
  }

  async update(id, changes){
    const index = this.peoples.findIndex((item)=> item.id === id);
    if (index === -1) {
      throw new Error('La persona no existe');
    }
    const people = this.peoples[index];
    this.peoples[index]={
      ...people,
      ...changes,
    };
    return this.peoples[index];
  }

  async delete(id){
    const index = this.peoples.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.peoples.splice(index, 1);
    return { id };
  }
}

module.exports= peopleService;
