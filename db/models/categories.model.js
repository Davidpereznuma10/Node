const { Model, DataTypes, Sequelize  } =require('sequelize');

const  CATEGORIES_TABLE =  'categories';

const categoriesSchema = {
    id:{
        allowNull : false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    categoryName:{
        allowNull:false,
        field: 'name_category',
        type: DataTypes.STRING,
        unique: true
    },
    description:{
        allowNull: false,
        field: 'descrip',
        type:DataTypes.STRING
    },
    createAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class Category extends Model {
    static associate(){
        //associate
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: CATEGORIES_TABLE,
            modelName: 'Category',
            timestamps:false
        }
    }

}
module.exports = { categoriesSchema, CATEGORIES_TABLE, Category }
