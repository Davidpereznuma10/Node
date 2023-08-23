const { Model, DataTypes, Sequelize  } = require('sequelize');

const PRODUCTS_TABLE = 'products';

const ProductsSchema ={
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    productName:{
        allowNull: false,
        field: 'name_product',
        type: DataTypes.STRING,
        unique: true
    },
    description:{
        allowNull: false,
        field: 'descript',
        type: DataTypes.STRING,
    },
    price:{
        allowNull:false,
        field: 'cost',
        type: DataTypes.INTEGER
    },
    stock:{
        allowNull: false,
        field: '_stock',
        type: DataTypes.INTEGER
    },
    createAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class Product extends Model{
    static associate(){
        //Associate
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: PRODUCTS_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }
}

module.exports = { ProductsSchema, PRODUCTS_TABLE, Product }
