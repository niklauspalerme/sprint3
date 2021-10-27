/////////////////////////////////////////////////////////////
// Variables Iniciales 

const {Router} = require("express");
const { getOrders, getOrderClient, createOrder, getOrder, deleteOrder, updateOrder, updateOrderState } = require("../controllers/handdlers/order");
const { foundAgendaOrder, checkAddressVsUserIdOrder } = require("../middleware/agenda");
const { verifyJWTAdmins, verifyJWT, verifyUserDisabled } = require("../middleware/auth");
const {foundMethodPaymentOrder}= require("../middleware/methodPayment");
const { foundQuantityInProductsOrder, foundOrder, foundOrderState, checkOrderVsUserId } = require("../middleware/order");
const { foundProductsOrder } = require("../middleware/product");


/////////////////////////////////////////////////////////////
// Función Principal


const orderRouter = () =>{

    const router = new Router();

   
    router.get('/',verifyJWT, getOrderClient);
    router.post('/', verifyJWT,verifyUserDisabled,foundAgendaOrder,checkAddressVsUserIdOrder,
                     foundProductsOrder, foundQuantityInProductsOrder, foundMethodPaymentOrder, createOrder);
    router.get('/admins',verifyJWTAdmins, getOrders);
    router.put('/state/:orderId',verifyJWTAdmins,foundOrder, updateOrderState);
    router.get('/:orderId', verifyJWT, verifyUserDisabled,foundOrder, checkOrderVsUserId,getOrder);
    router.put('/:orderId', verifyJWT,verifyUserDisabled,foundOrder, checkOrderVsUserId, 
                            foundAgendaOrder,checkAddressVsUserIdOrder,foundOrderState,foundProductsOrder,
                            foundQuantityInProductsOrder, foundMethodPaymentOrder, updateOrder);
    router.delete('/:orderId',verifyJWT,verifyUserDisabled,foundOrder,checkOrderVsUserId,foundOrderState, deleteOrder);



    return router;

}



/////////////////////////////////////////////////////////////
// Exportamos 

module.exports={
    orderRouter
}