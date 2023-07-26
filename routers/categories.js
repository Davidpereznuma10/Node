const express = require('express');
const categoriesService = require('../services/categories_service');
const { checkEmptyJSON } = require('../middlewares/error.handler')
const router = express.Router();
const service = new categoriesService();

// Ruta Para traer todas las categorias
router.get('/', async (req, res, next) => {
  try {
    const categoria = await service.find();
    res.status(200).json(categoria);
  } catch (error) {
    next(error);
  };
});

//Ruta para buscar las categorias por id
router.get('/:categoriesId', async (req, res, next) => {
  const { categoriesId } = req.params;
  try {
    const categoria = await service.findOne(categoriesId);
    res.status(200).json(categoria);
  } catch (error) {
    next(error);
  };
});

//Ruta Para traer las categorias con todos sus productos
router.get('/:categoriesId/products', async (req, res, next) => {
  const { categoriesId, products } = req.params;
  try {
    const categoria = await service.addProductsToCategory(categoriesId, products);
    res.status(200).json(categoria);
  } catch (error) {
    next(error);
  };
});

// Ruta para crear una nueva categoria
router.post('/', checkEmptyJSON, async (req, res, next) => {
  const body = req.body;
  try {
    const categoria = await service.create(body);
    res.status(201).json(categoria);
  } catch (error) {
    next(error);
  };
});

//Ruta para actualizar una categoria
router.patch('/:categoriesId',checkEmptyJSON, async (req, res, next) => {
  const { categoriesId } = req.params;
  const body = req.body;
  try {
    const categoria = await service.update(categoriesId, body);
    res.json(categoria);
  } catch (error) {
    next(error);
  };
});

//Ruta oara borrar una categoria
router.delete('/:categoriesId', async (req, res, next) => {
  const { categoriesId } = req.params;
  try {
    const categoria = await service.delete(categoriesId);
    res.json(categoria);
  } catch (error) {
    next(error);
  };
});

module.exports = router;
