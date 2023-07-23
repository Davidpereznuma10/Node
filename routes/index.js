const products = require('./products.js');
const users = require('./user.js');
const categories = require('./categories.js');
const people = require('./people.js');
const express = require('express');

function routerApi(app){

  const router = express.Router();
  app.use('/api/v1', router)

  router.use('/products', products);
  router.use('/users', users);
  router.use('/categories',categories);
  router.use('/people',people);
}

module.exports = routerApi;
