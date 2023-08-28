const { User, UserSchema } = require('./user.model');
const { Category, categoriesSchema } = require('./categories.model');
const { People, peopleSchema } = require('./people.model');
const { Product, ProductsSchema } = require('./products.model');
const { Pedido, pedidosSchema } = require('./pedidos.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(categoriesSchema,Category.config(sequelize));
  People.init(peopleSchema,People.config(sequelize));
  Product.init(ProductsSchema,Product.config(sequelize));
  Pedido.init(pedidosSchema, Pedido.config(sequelize));
}

module.exports = setupModels;
