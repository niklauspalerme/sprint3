/////////////////////////////////////////////////////////////
// Variables


const Sequelize = require("sequelize");
const { createAgendaModel } = require("./models/agenda");
const { createOrderModel } = require("./models/order");
const { createOrderProductModel } = require("./models/order_Product");
const { createPaymentMethodModel } = require("./models/paymentMethod");
const { createProductdModel } = require("./models/product");
const { createUserModel } = require("./models/user");
const models = {}; //Variable para acceder a los modelos
let db = null; // Vairable para acceder a la conexión


/////////////////////////////////////////////////////////////
// Funciones


//1- Función para Conecta a la DB
const connect = async (host, port, username, password, database) => {
    
   // a) Si existe la DB
  try{

    const connection = new Sequelize({
      database,
      username,
      password,
      host,
      port,
      dialect: 'mysql', 
    });
    

    //Guardamos los modelos 
    models.User = createUserModel(connection);
    models.Agenda = createAgendaModel(connection);
    models.PaymentMethod = createPaymentMethodModel(connection);
    models.Product = createProductdModel(connection);
    models.Order = createOrderModel(connection);
    models.OrderProduct = createOrderProductModel(connection, models.Order, models.Product);


    // Síncronizamos las relaciones
    //1
    models.User.hasMany(models.Agenda);  // 1-N
    models.Agenda.belongsTo(models.User) // N-1
    //2
    models.User.hasMany(models.Order) // 1-N
    models.Order.belongsTo(models.User) // N-1
    //3
    models.Agenda.hasMany(models.Order) // 1-N
    models.Order.belongsTo(models.Agenda) // N-1
    //4
    models.PaymentMethod.hasMany(models.Order) // 1-N
    models.Order.belongsTo(models.PaymentMethod) //N-1
    //5
    models.Order.belongsToMany(models.Product, {through: models.OrderProduct});
    models.Product.belongsToMany(models.Order, {through: models.OrderProduct});

    //Autentificamos la conexion
    await connection.authenticate();
    //Sincronizamos los modelos
    await connection.sync();

    console.log('La Base de Datos existe.....')

    //Capturamos la conexión
    db = connection;
   
    console.log('Connection has been established successfully.....');


  }catch(error){
    
    if (error.original.errno === 1049){

      let otraConnection = new Sequelize({
        username,
        password,
        host,
        port,
        dialect: 'mysql', 
      });

      await otraConnection.query(`CREATE DATABASE ${database}`)
          .then(() => {
            console.error('Database doesnt exists, lets create a new one.....')
          })
        	.catch(errorx => console.error('Unable to connect to the database: ', errorx));

      await createSyncTables(otraConnection, host, port, username, password, database);

	  } 
  }

}


//2) Función Sincronizacion De Tabalas
const createSyncTables =  async (otraConnection, host, port, username, password, database) => {

    try{
  
        otraConnection = new Sequelize({
            database,
            username,
            password,
            host,
            port,
            dialect: 'mysql', 
        });
      
        //Guardamos los modelos 
        models.User = createUserModel(otraConnection);
        models.Agenda = createAgendaModel(otraConnection);
        models.PaymentMethod = createPaymentMethodModel(otraConnection);
        models.Product = createProductdModel(otraConnection);
        models.Order = createOrderModel(otraConnection);
        models.OrderProduct = createOrderProductModel(otraConnection, models.Order, models.Product)


        // Síncronizamos las relaciones
        //1
        models.User.hasMany(models.Agenda);  // 1-N
        models.Agenda.belongsTo(models.User) // N-1
        //2
        models.User.hasMany(models.Order) // 1-N
        models.Order.belongsTo(models.User) // N-1
        //3
        models.Agenda.hasMany(models.Order) // 1-N
        models.Order.belongsTo(models.Agenda) // N-1

        //4
        models.PaymentMethod.hasMany(models.Order) // 1-N
        models.Order.belongsTo(models.PaymentMethod) //N-1

        //5
        models.Order.belongsToMany(models.Product, {through: models.OrderProduct});
        models.Product.belongsToMany(models.Order, {through: models.OrderProduct});
    
        await otraConnection.authenticate();
        await otraConnection.sync();
  
        db = otraConnection;
    
        console.log('Connection has been established successfully.....')
  
    }catch(error){
  
      console.log("Error aca en createSyncTables.... ", error);
    }
  }


//3) Función para obtener el Modelo
const  getModel = (name)=> {

    if (!models[name]) {
      global.console.log('No existe el modelo');
      return null;
    }

    return models[name]
  }
  
  
//4) Función para obtener la conexión
const dbConexion =  () => {
    return db;
  }
  

/////////////////////////////////////////////////////////////
// Exportamos

  module.exports = {
    connect,
    getModel,
    dbConexion
  };