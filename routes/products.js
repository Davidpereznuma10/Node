const express = require("express");
const router  = express.Router();
const { faker } = require('@faker-js/faker');

router.get('/', (req, res) => {
  const products =[];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 1; i <= limit; i++) {
    products.push({
      id:i,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products)
});

router.get('/filter',(req, res)=>{
  res.send('prueba-filtro');
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        name: 'iPhone X3',
        price: 32000,
    });
});

module.exports = router;
