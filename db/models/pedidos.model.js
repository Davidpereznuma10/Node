const { Model, DataTypes, Sequelize } = require('sequelize');

const PEDIDOS_TABLE = 'pedidos';

const pediosSchema = {
    id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER
    },
    fechaPedido:{
        allowNull:false,
        field:'date',
        type: DataTypes.DATE,
    },
    estado:{
        allowNull: true,
        field: 'state',
        type: DataTypes.STRING
    },
    descripcion:{
        allowNull:true,
        field: 'descrip',
        type: DataTypes.STRING
    },
    createAt:{
        allowNull:false,
        type:DataTypes.STRING,
        defaultValue:Sequelize.NOW,
        field:'create_at'
    }
}

class Pedido extends Model{
    static associate(){
        //associate
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: PEDIDOS_TABLE,
            modelNAme: 'Pedido',
            timestamps: false
        }
    }
}

module.exports = { PEDIDOS_TABLE, pediosSchema, Pedido }
