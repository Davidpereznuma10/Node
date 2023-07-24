const { faker } = require('@faker-js/faker');

class categoriesService{
  constructor(){
    this.categories=[];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        categoriesId: faker.datatype.uuid(),
        categorias: faker.color.rgb(),
    })
  }
  }

  create(){
    const { categoria }= data;
    const category = {
      categoriesId: faker.datatype.uuid(),
      categoria,
    };
    this.categories.push(category);
    return category;
  }

  find(){
    return this.categories;
  }

  finOne(categoriesId){
    return this.categories.find((e)=> e.categoriesId=== categoriesId);
  }

  update(categoriesId, changes){
    const index = this.categories.findIndex((e)=>e.categoriesId===categoriesId);
    if (index===-1) {
      throw new Error('Category not found');
    }
    const category = this.categories[index];
    this.categories[index]={
      ...category,
      ...changes,
    };
    return this.categories[index];
  }

  delete(categoriesId){
    const index = this.categories.findIndex((e)=>e.categoriesId===categoriesId);
    if(index===-1){
      throw new Error('Product no found');
    }
    this.categories.splice(index,1);
    return { categoriesId };
  }
}

module.exports= categoriesService;
