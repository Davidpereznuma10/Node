const {  Model, DataTypes, Sequelize} = require('sequelize');

const PEOPLE_TABLE = 'people';

const peopleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull:false,
    field: 'name_',
    type: DataTypes.STRING
  },
  lastname:{
    allowNull: false,
    field: 'last_name',
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    field: 'e_mail',
    type: DataTypes.STRING,
    unique: true,
  },
  number:{
    allowNull:false,
    field: 'phone_number',
    type: DataTypes.NUMBER,
    unique: true,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}
class People extends Model{
    static associate (){
        //associate
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: PEOPLE_TABLE,
            modelName: 'People',
            timestamps: false
        }
    }
}

module.exports = { PEOPLE_TABLE, People, peopleSchema }
