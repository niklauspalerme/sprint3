/////////////////////////////////////////////////////////////
// Variables Iniciales

const {DataTypes } = require('sequelize');


/////////////////////////////////////////////////////////////
// Función 


const createOrderProductModel = (connection, Order, Product) =>{

    const OrderProduct = connection.define('OrderProduct', {
        OrderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: Order,
            key: "id"
          }
      },
      ProductId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Product,
          key: "id"
        }
      },
       quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
      }, {
        modelName: 'OrderProduct',
        tableName: 'orderproduct'
      });

    return OrderProduct;
}


/////////////////////////////////////////////////////////////
// Variables Iniciales


module.exports={
  createOrderProductModel
}