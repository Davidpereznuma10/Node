const express = require('express');
const ProductsService = require('../services/products_service');
const { checkEmptyJSON } = require('../middlewares/error.handler')
const router = express.Router();
const service = new ProductsService();

//Ruta para traer todas las productos
router.get('/', async(req, res, next) => {
try {
  const products = await service.find();
  res.status(200).json(products);
} catch (error) {
  next(error);
};
});

//Ruta para traer a productos por id
router.get('/:id_product', async(req, res, next) => {
  const { id_product } = req.params;
  try {
    const product = await service.findOne(id_product);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  };
});

// Ruta para crear un nuevo producto
router.post('/',checkEmptyJSON, async(req, res, next) => {
  const body = req.body;
  try {
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  };
});

//Ruta para actualizar a las productos
router.patch('/:id_product', checkEmptyJSON, async(req, res, next) => {
  const { id_product } = req.params;
  const body = req.body;
  try {
    const product = await service.update(id_product, body);
    res.json(product);
  } catch (error) {
    next(error);
  };
});

//Ruta Para borrar a productos por id
router.delete('/:id_product', async(req, res, next) => {
  const { id_product } = req.params;
  try {
    const rta = await service.delete(id_product);
    res.json(rta);
  } catch (error) {
    next(error);
  };
});

module.exports = router;
