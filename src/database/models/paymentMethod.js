/////////////////////////////////////////////////////////////
// Variables Iniciales

const {DataTypes } = require('sequelize');


/////////////////////////////////////////////////////////////
// Función 


const createPaymentMethodModel = (connection) =>{

    const PaymentMethod = connection.define('PaymentMethod', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        }
      }, {
        modelName: 'PaymentMethod',
        tableName: 'PaymentMethod'
      });
      return PaymentMethod;
}


/////////////////////////////////////////////////////////////
// Variables Iniciales


module.exports={
    createPaymentMethodModel
}