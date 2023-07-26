const products = require('./products.js');
const users = require('./user.js');
const categories = require('./categories.js');
const people = require('./people.js');
const express = require('express');

//Ruta api
function routerApi(app){

  //version de la api
  const router = express.Router();
  app.use('/api/v1', router)

  //Rutas de la api
  router.use('/products', products);
  router.use('/users', users);
  router.use('/categories',categories);
  router.use('/people',people);
}

module.exports = routerApi;
