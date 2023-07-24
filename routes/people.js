const express = require('express');
const peplesService = require('../services/people_service');
const peopleService = require('../services/people_service');
const router = express.Router();
const service = new peopleService();


router.get('/', (req, res) => {
 const people = service.find();
  res.json(people)
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const people = service.findOne(id);
  res.json(people);
});

router.post('/',(req, res)=>{
  const body = req.body;
  const newPeople = service.create(body)
  res.status(201).json(newPeople);
})

router.patch('/:id', (req, res)=>{
  const { id }= req.params;
  const body = req.body;
  const upPeople = service.update(id, body)
  res.json(upPeople);
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedPerson = service.delete(id);
  res.json(deletedPerson);
});

module.exports = router;
