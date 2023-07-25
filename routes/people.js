const express = require('express');
const peopleService = require('../services/people_service');
const router = express.Router();
const service = new peopleService();

//Middleware para traer todas las personas
router.get('/',async (req, res) => {
try {
  const people = await service.find();
  res.json(people)
} catch (error) {
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
}
});

//Middleware para traer a personas por id
router.get('/:id',async (req, res) => {
  const { id } = req.params;
  try {
  const people = await service.findOne(id);
  if (people === null) {
    return res.status(404).json({error:'Perosna no encontrada'})
  }
  res.status(200).json(people);
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

// Middleware para crear una nueva persona
router.post('/',  checkEmptyJSON ,async(req, res)=>{
  const body = req.body;
try {
  const newPeople = await service.create(body)
  if (newPeople === null) {
    return res.status(404).json({error:'Perosna no encontrada'})
  }
  res.status(201).json(newPeople);
} catch (error) {
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
}
})

//Middleware para actualizar a las personas
router.patch('/:id', checkEmptyJSON, async (req, res)=>{
  const { id }= req.params;
  const body = req.body;
try {
  const upPeople = await service.update(id, body)
  if (upPeople === null) {
    return res.status(404).json({ error: 'Persona no encontrada' });
  }
  res.json(upPeople);
} catch (error) {
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
}
})

//Middleware Para borrar a personas por id
router.delete('/:id',async (req, res) => {
  const { id } = req.params;
try {
  const deletedPerson = await service.delete(id);
  if (deletedPerson === null) {
    return res.status(404).json({ error: 'Categoría no encontrada' });
  }
  res.json(deletedPerson);
} catch (error) {
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
}
});

module.exports = router;
