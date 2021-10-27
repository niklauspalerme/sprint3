/////////////////////////////////////////////////////////////
// Variables Iniciales 


const express = require('express');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const { agendaRouter } = require('./routers/agenda');
const { orderRouter } = require('./routers/order');
const { paymentMethodRouter } = require('./routers/paymentMethod');
const { productRouter } = require('./routers/product');
const { userRouter } = require('./routers/user');


/////////////////////////////////////////////////////////////
// Función Principal


const ServerUp = (PORT, message= 'The server is ready') =>{

    /////////////////////////////////////////////////////////////
    // Variables 

    const server = express();

    /////////////////////////////////////////////////////////////
    // Swagger

    const swaggerDocs = require('./swagger.json')

    /////////////////////////////////////////////////////////////
    // Global Middlewares

    server.use(express.json());
    server.use(express.urlencoded({extended: false}));
    server.use('/v1/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    server.use(helmet());

    /////////////////////////////////////////////////////////////
    // Routers

    server.use('/api/v1/agendas', agendaRouter());
    server.use('/api/v1/mediosDePago', paymentMethodRouter());
    server.use('/api/v1/productos', productRouter());
    server.use('/api/v1/usuarios', userRouter());
    server.use('/api/v1/pedidos', orderRouter());

    /////////////////////////////////////////////////////////////
    //Puerto

    server.listen( PORT , ()=>{
        console.log(`${message} in port ${PORT}`)
    })

    return server;
}


/////////////////////////////////////////////////////////////
// Exportamos


module.exports= {ServerUp}