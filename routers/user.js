const express = require("express");
const userService = require("../services/user_service");
const { checkEmptyJSON } = require('../middlewares/error.handler')
const services = new userService()
const router = express.Router();

//Ruta para traer a toods los usarios
router.get('/', async (req, res, next)=>{
  try {
    const user = await services.find();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

//Ruta para trae a usuarios por su id
router.get('/:id', async (req, res, next)=>{
  const { id } = req.params;
  try {
    const user = await services.finOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//Ruta para crear un nuevo usuario
router.post('/', checkEmptyJSON, async (req, res, next) => {
  const body = req.body;
  try {
    const newUser = await services.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

//Ruta para actualizar un usuario
router.patch('/:id', checkEmptyJSON, async (req, res, next)=>{
  const { id } = req.params;
  const body = req.body;
  try {
    const upUser = await services.update(id, body);
    res.json(upUser);
  } catch (error) {
    next(error);
  }
});

//Ruta para borrar un usuario
router.delete('/:id', async (req, res, next)=>{
  const { id } = req.params;
  try {
    const delUser = await services.delete(id);
    res.json(delUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
