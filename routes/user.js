const express = require("express");
const userService = require("../services/user_service");
const services = new userService()
const router = express.Router();

//Middleware para traer a toods los usarios
router.get('/', async (req, res)=>{
  try {
    const user = await services.find();
    if (user === null) {
      return res.status(404).json({error:'user no encontrada'})
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

//Middleware para trae a usuarios por su id
router.get('/:id', async (req, res)=>{
  const { id } = req.params;
  try {
    const user = await services.finOne(id);
    if (user === null) {
      return res.status(404).json({error:'user no encontrada'})
    }
    res.json(user);
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

//Middleware para crear un nuevo usuario
router.post('/',checkEmptyJSON, async (req, res)=>{
  const body = req.body;
  try {
    const newUser = await services.create(body);
    if (newUser === null) {
      return res.status(404).json({error:'user no encontrada'})
    }
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

//Middleware para actualizar un usuario
router.patch('/:id', checkEmptyJSON, async (req, res)=>{
  const { id } = req.params;
  const body = req.body;
  try {
    const upUser = await services.update(id, body);
    if (upUser === null) {
      return res.status(404).json({error:'user no encontrada'})
    }
    res.json(upUser);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

//Middleware para borrar un usuario
router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  try {
    const delUser = await services.delete(id);
    if (delUser === null) {
      return res.status(404).json({error:'user no encontrada'})
    }
    res.json(delUser);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

module.exports = router;
