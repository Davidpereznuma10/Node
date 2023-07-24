const express = require("express");
const userService = require("../services/user_service");
const services = new userService()
const router = express.Router();

router.get('/',(req,res)=>{
  const user = services.find();
  res.json(user);
});

router.get('/:id', (req,res)=>{
  const { id } = req.params;
  const user = services.finOne(id);
  res.json(user);
});

router.post('/', (req,res)=>{
  const body = req.body;
  const newUser = services.create(body);
  res.status(201).json(newUser);
});

router.patch('/:id', (req,res)=>{
  const { id } = req.params;
  const body = req.body;
  const upUser = services.update(id, body);
  res.json(upUser);
});

router.delete('/', (req,res)=>{
  const { id } = req.params;
  const delUser = services.delete(id);
  res.json(delUser);
});

module.exports = router;
