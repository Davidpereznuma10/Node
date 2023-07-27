const express = require('express');
const peopleService = require('../services/people_service');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const { createPeopleDto, getPeopleDto, updatePeopleDto  } = require('../model/people_Dto');
const service = new peopleService();

//Ruta para traer todas las personas
router.get('/',async (req, res, next) => {
try {
  const people = await service.find();
  res.json(people);
} catch (error) {
  next(error);
};
});

//Ruta para traer a personas por id
router.get('/:id',
  validatorHandler(getPeopleDto, 'params'),
  async (req, res, next) => {
  const { id } = req.params;
  try {
  const people = await service.findOne(id);
  res.status(200).json(people);
} catch (error) {
  next(error);
};
});

// Ruta para crear una nueva persona
router.post('/',
  validatorHandler(createPeopleDto,'body'),
  async(req, res, next)=>{
  const body = req.body;
try {
  const newPeople = await service.create(body);
  res.status(201).json(newPeople);
} catch (error) {
  next(error);
};
});

//Ruta para actualizar a las personas
router.patch('/:id',
  validatorHandler(getPeopleDto, 'params'),
  validatorHandler(updatePeopleDto, 'body'),
  async (req, res, next)=>{
  const { id }= req.params;
  const body = req.body;
try {
  const upPeople = await service.update(id, body);
  res.json(upPeople);
} catch (error) {
  next(error);
};
})

//Ruta Para borrar a personas por id
router.delete('/:id',
  validatorHandler(getPeopleDto, 'params'),
  async (req, res, next) => {
  const { id } = req.params;
try {
  const deletedPerson = await service.delete(id);
  res.json(deletedPerson);
} catch (error) {
  next(error);
};
});

module.exports = router;
