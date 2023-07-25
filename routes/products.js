const express = require('express');

const ProductsService = require('../services/products_service');

const router = express.Router();
const service = new ProductsService();

//Middleware para traer todas las productos
router.get('/', async(req, res) => {
try {
  const products = await service.find();
  res.json(products);
} catch (error) {
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
}
});

//Middleware para traer a productos por id
router.get('/:id_product', async(req, res) => {
  const { id_product } = req.params;
  try {
    const product = await service.findOne(id_product);
    if (product === null) {
      return res.status(404).json({error:'producto no encontrado'})
    }
    res.status(200).json(product);
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

// Middleware para crear un nuevo producto
router.post('/',checkEmptyJSON, async(req, res) => {
  const body = req.body;
  try {
    const newProduct = await service.create(body);
    if (body === null) {
      return res.status(404).json({error:'producto no encontrado'})
    }
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

//Middleware para actualizar a las productos
router.patch('/:id_product', checkEmptyJSON, async(req, res) => {
  const { id_product } = req.params;
  const body = req.body;
  try {
    const product = await service.update(id_product, body);
    if (product === null) {
      return res.status(404).json({error:'producto no encontrado'})
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

//Middleware Para borrar a productos por id
router.delete('/:id_product', async(req, res) => {
  const { id_product } = req.params;
  try {  const rta = await service.delete(id_product);

    if (rta === null) {
      return res.status(404).json({error:'producto no encontrado'})
    }
    res.json(rta);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

module.exports = router;
