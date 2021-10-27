/////////////////////////////////////////////////////////////
// Variables Iniciales

const {DataTypes } = require('sequelize');


/////////////////////////////////////////////////////////////
// Función 


const createOrderModel = (connection) =>{

    const Order = connection.define('Order', {
        state: {
          type: DataTypes.STRING,
          allowNull: false
       },
        totalPrice: {
          type: DataTypes.INTEGER
        }
      }, {
        modelName: 'Order',
        tableName: 'order'
      });
      return Order;
}


/////////////////////////////////////////////////////////////
// Variables Iniciales


module.exports={
    createOrderModel
}