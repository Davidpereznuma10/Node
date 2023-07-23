const products = require('./products.js');
const users = require('./user.js');
const categories = require('./categories.js');
const people = require('./people.js');

function routerApi(app){
  app.use('/products', products);
  app.use('/users', users);
  app.use('/categories',categories);
  app.use('/people',people);
}

module.exports = routerApi;
