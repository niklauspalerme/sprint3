/////////////////////////////////////////////////////////////
// Variables Iniciales 

const {Router} = require("express");
const { getPaymentMethod, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } = require("../controllers/handdlers/paymentMethod");
const { verifyJWT, verifyJWTAdmins, verifyUserDisabled } = require("../middleware/auth");
const { foundMethodPayment } = require("../middleware/methodPayment");


/////////////////////////////////////////////////////////////
// Función Principal


const paymentMethodRouter = () =>{


    const router = new Router();

    router.get('/',verifyJWT, getPaymentMethod );
    router.post('/', verifyJWTAdmins,createPaymentMethod);
    router.put('/:id',verifyJWTAdmins,foundMethodPayment, updatePaymentMethod);
    router.delete('/:id',verifyJWTAdmins,foundMethodPayment, deletePaymentMethod);

    return router;

}



/////////////////////////////////////////////////////////////
// Exportamos 

module.exports={
    paymentMethodRouter
}