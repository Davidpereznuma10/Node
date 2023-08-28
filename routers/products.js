const express = require('express');
const ProductsService = require('../services/products_service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductDto, updateProductDto, getProductDto  } = require('../model/product_Dto');
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
router.get('/:id',
validatorHandler(getProductDto, 'params'),
  async(req, res, next) => {
  const { id } = req.params;
  try {
    const product = await service.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  };
});

// Ruta para crear un nuevo producto
router.post('/',
  validatorHandler(createProductDto,'body'),
  async(req, res, next) => {
  const body = req.body;
  try {
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  };
});

//Ruta para actualizar a las productos
router.patch('/:id',
  validatorHandler(getProductDto, 'params'),
  validatorHandler(updateProductDto,'body'),
  async(req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  };
});

//Ruta Para borrar a productos por id
router.delete('/:id',
  async(req, res, next) => {
  const { id } = req.params;
  try {
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  };
});

module.exports = router;
