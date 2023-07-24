const express = require('express');
const categoriesService = require('../services/categories_service');

const router = express.Router();
const service = new categoriesService();


router.get('/', (req,res)=>{
  const category = service.find();
  res.json(category)
})

router.get('/:categoriesId/products/:productId', (req, res) => {
  const { categoriesId, productId } = req.params;
  res.json({
      categoriesId,
      productId,
  });
});

router.get('/:categoriesId', (req, res) => {
  const { categoriesId } = req.params;
  const category = service.finOne(categoriesId);
  res.json(category);
});

router.post('/',(req,res)=>{
  const body = req.body;
  const newCategory = service.create(body);
  res.status(201).json(newCategory);
})

router.patch('/:categoriesId', (req,res)=>{
  const{ categoriesId }= req.params;
  const body = req.body;
  const category = service.update(categoriesId, body);
  res.json(category);
})



router.delete('/:categoriesId',(req,res)=>{
  const { categoriesId } =req.params;
  const categoryDelete = service.delete(categoriesId)
  res.json(categoryDelete)
})


module.exports = router;
