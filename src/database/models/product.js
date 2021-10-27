/////////////////////////////////////////////////////////////
// Variables Iniciales

const {DataTypes } = require('sequelize');


/////////////////////////////////////////////////////////////
// Función 


const createProductdModel = (connection) =>{

    const Product = connection.define('Product', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        picture:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
      }, {
        modelName: 'Product',
        tableName: 'Product'
      });
      return Product;
}


/////////////////////////////////////////////////////////////
// Variables Iniciales


module.exports={
    createProductdModel
}