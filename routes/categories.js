const express = require('express');
const categoriesService = require('../services/categories_service');

const router = express.Router();
const service = new categoriesService();

// Middleware Para traer todas las categorias
router.get('/', async (req, res) => {
  try {
    const categoria = await service.find();
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

//Middleware para buscar las categorias por id
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

//Middleware Para traer las categorias con todos sus productos
router.get('/:categoriesId/products', async (req, res) => {
  const { categoriesId, products } = req.params;
  try {
    const categoria = await service.addProductsToCategory(categoriesId, products);
    if (categoria === null) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

// Middleware para manejar el JSON vacío
function checkEmptyJSON(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'El JSON enviado está vacío' });
  }
  next();
}

// Middleware para crear una nueva categoria
router.post('/', checkEmptyJSON, async (req, res) => {
  const body = req.body;
  try {
    const categoria = await service.create(body);
    if (categoria === null) {
      return res.status(404).json({ error: 'Categoría no Creada' });
    }
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

//Middleware para actualizar una categoria
router.patch('/:categoriesId',checkEmptyJSON, async (req, res) => {
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

//Middleware oara borrar una categoria
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
