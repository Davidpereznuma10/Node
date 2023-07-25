const express = require('express');
const categoriesService = require('../services/categories_service');

const router = express.Router();
const service = new categoriesService();

router.get('/', async (req, res) => {
  try {
    const categoria = await service.find();
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.get('/:categoriesId', async (req, res) => {
  const { categoriesId } = req.params;
  try {
    const categoria = await service.findOne(categoriesId);
    if (categoria === null) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.get('/:categoriesId/products/:productId', async (req, res) => {
  const { categoriesId, productId } = req.params;
  try {
    const categoria = await service.addProductsToCategory(categoriesId, productId);
    if (categoria === null) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  try {
    const categoria = await service.create(body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.patch('/:categoriesId', async (req, res) => {
  const { categoriesId } = req.params;
  const body = req.body;
  try {
    const categoria = await service.update(categoriesId, body);
    if (categoria === null) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.delete('/:categoriesId', async (req, res) => {
  const { categoriesId } = req.params;
  try {
    const categoria = await service.delete(categoriesId);
    if (categoria === null) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

module.exports = router;
