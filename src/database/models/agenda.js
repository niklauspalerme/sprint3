/////////////////////////////////////////////////////////////
// Variables Iniciales

const {DataTypes } = require('sequelize');


/////////////////////////////////////////////////////////////
// Función 


const createAgendaModel = (connection) =>{

    const Agenda = connection.define('Agenda', {
        address: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }, {
        modelName: 'Agenda',
        tableName: 'Agenda'
      });
      return Agenda;
}


/////////////////////////////////////////////////////////////
// Variables Iniciales


module.exports={
    createAgendaModel
}