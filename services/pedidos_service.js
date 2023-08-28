const Boom = require('@hapi/boom');
const { models } = require('../libs/sequelize')
const Pedido = models.Pedido;

class pedidoService{
    async create(data){
        try {
            const { fechaPedido, estado, descripcion } = data;
            if (!fechaPedido || !estado || !descripcion) {
                throw Boom.badRequest('Faltan datos obigatorios para crear un pedido');
            };
            const createPedido = await Pedido.create({ fechaPedido, estado, descripcion });
            return createPedido;
        } catch (error){
            console.error('Error al crear el pedido: ', error);
            throw Boom.badImplementation('Error interno en el servidor');
        }
    };

    async find(){
        try {
            const pedido= await Pedido.findAll();
            if (pedido.length === 0) {
                throw Boom.notFound('No hay pedidos')
            };
            return pedido;
        } catch (error) {
            console.error('Error al optener los pedidos', error);
            throw Boom.badImplementation('Error interno en el servidor');
        };
    };
    async findOne (id){
        try {
            const pedido = await Pedido.findByPk(id);
            if (pedido.length === 0) {
                throw Boom.notFound('Pedido no encontrado');
            }
            return pedido;
        } catch (error) {
            console.error('Error al obtener el Pedido: ', error);
            throw Boom.badImplementation('Error interno en el servidor');
        };
    };

    async update( id, changes ){
        try {
            const pedido = await this.findOne(id);
            const { fechaPedido, estado, description } = changes;
            if ( !fechaPedido && !estado && !description ) {
                throw Boom.badRequest('No se proporcionaron datos para actualizar el pedido');
            };
            const updatePedido = await pedido.update(changes);
            return updatePedido
        } catch (error) {
            console.error('Error al actualizar el pedido:', error);
            throw Boom.badImplementation('Error interno en el servidor');
        };
    };

    async delete(id){
        try {
            const pedido = await this.findOne(id);
            await   pedido.destroy();
            return { message: `Se borró el pedido con la id: ${id}`, deletedProductId: id  }
        } catch (error) {
            console.error('Error al eliminar el pedido:', error);
            throw Boom.badImplementation('Error interno en el servidor');
        }
    };
};

module.exports = pedidoService;
