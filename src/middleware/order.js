const { checkAddressVsUserIdDB } = require("../controllers/dbOperations/agenda");
const { getModel } = require("../database");
const jwt = require('jsonwebtoken');
const { checkOrderVsUserIdDB } = require("../controllers/dbOperations/order");


//1
const foundQuantityInProductsOrder = (req,resp,next)=>{

    let products = req.body.products;

    console.log("Local Middleware -----> foundQuantityInProductsOrder");
     
    products= products.every( product => product.quantity >= 1);

    if(products == true)
        next();
    else
        resp.status(400).json({"Message": "Un producto no puede tener 0 de quantity"}); 

}


//2
const foundOrder = async (req,resp, next) =>{

   try {
       
        const Order = getModel('Order');

        console.log("Local Middleware -----> foundOrder");

        const foundOrder = await Order.findOne({
            where:{
                id: req.params.orderId
            }
        });

        if (foundOrder === null)
        resp.status(404).json({"Message": "No se encuentra la orden"})
    else
        next();

    } catch (error) {
        console.log(error);
    }

}

//3
const foundOrderState = async (req,resp, next) =>{

    try {
        
         const Order = getModel('Order');

         console.log("Local Middleware -----> foundOrderState");
 
         const foundOrder = await Order.findOne({
             where:{
                 id: req.params.orderId
             }
         });
 
         if (foundOrder.state !== 'Processing')
         resp.status(400).json({"Message": "El pedido ya esta cerrado"})
     else
         next();
 
     } catch (error) {
         console.log(error);
     }
 
 }


//4 - Middleware para saber si esa orden es del usuario
const checkOrderVsUserId = async (req,resp,next)=>{

    try {
        
        let token = req.headers.authentication || '';
        let UserId = ""
        const {orderId}= req.params || '';
        const JWT_PASS = global.process.env.JWT_PASS;

        console.log("Local Middleware -----> checkOrderVsUserId");

        token = token.replace('Bearer ', '');

        jwt.verify(token, JWT_PASS, (error, decoded) => {
            if (error) 
                resp.status(401).json({"Message": "Credenciales Invalidas"})
            else 
                UserId = decoded.id;
        });

        const result = await  checkOrderVsUserIdDB(orderId,UserId);

        if (result !== null)
            next();
        else
            resp.status(403).json({"Message": "Operación Prohibida, coloque otro orden"});


    } catch (error) {
       console.log(error);
       resp.status(500).send(error);
    }
}

module.exports={
    foundQuantityInProductsOrder,
    foundOrder,
    foundOrderState,
    checkOrderVsUserId
}