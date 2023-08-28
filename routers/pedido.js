const express = require('express');
const pedidoService = require('../services/pedidos_service');
const validatorHandler = require('../middlewares/validator.handler');
const { createPedidosDto, getPedidoDto, updatePedidoDto } = require('../model/pedidos_Dto');
const router = express.Router();
const service = new pedidoService();

router.get('/', async(req, res, next)=>{
    try {
        const pedidos = await service.find();
        res.status(200).json(pedidos);
    } catch (error) {
        next(error);
    };
});

router.get('/:id',
    validatorHandler(getPedidoDto, 'params'),
    async(req, res, next)=>{
        const { id } = req.params;
        try {
            const pedido = await service.findOne(id);
            res.status(200).json(pedido);
        } catch (error) {
            next(error)
        }
    }
);

router.post('/',
    validatorHandler(createPedidosDto, 'body'),
    async(req, res, next)=>{
        const body = req.body;
        try {
            const newPedido = await service.create(body);
            res.status(201).json(newPedido)
        } catch (error) {
            next(error)
        };
    }
);

router.patch('/:id',
    validatorHandler(getPedidoDto, 'params'),
    validatorHandler(updatePedidoDto, 'body'),
    async(req,res, next)=>{
        const { id } = req.params;
        const body = req.body;
        try {
            const updatePedido = await service.update(id, body);
            res.json(updatePedido)
        } catch (error) {
            next(error)
        };
    }
);

router.delete('/:id',
    validatorHandler(getPedidoDto, 'params'),
    async(req, res, next)=>{
        const { id } = req.params;
        try {
            const deletePedido = await service.delete(id);
            res.json(deletePedido);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
