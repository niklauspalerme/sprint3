/////////////////////////////////////////////////////////////
// Variables Iniciales

const {DataTypes } = require('sequelize');


/////////////////////////////////////////////////////////////
// Función 


const createUserModel = (connection) =>{

    const User = connection.define('User', {
        username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        mobile:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        admins: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
      }, {
        modelName: 'User',
        tableName: 'User'
      });
      return User;
}


/////////////////////////////////////////////////////////////
// Variables Iniciales


module.exports={
    createUserModel
}