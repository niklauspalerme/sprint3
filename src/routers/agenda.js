/////////////////////////////////////////////////////////////
// Variables Iniciales 

const {Router} = require("express");
const { getAgenda, createAddress, getAgendaUsuario, updateAddress, deleteAddress } = require("../controllers/handdlers/agenda");
const { foundAgenda, checkAddressVsUserId } = require("../middleware/agenda");
const { verifyJWTAdmins, verifyJWT, verifyUserDisabled } = require("../middleware/auth");


/////////////////////////////////////////////////////////////
// Función Principal


const agendaRouter = () =>{

    const router = new Router();

    router.get('/admins',verifyJWTAdmins, getAgenda);
    router.get('/', verifyJWT, verifyUserDisabled,getAgendaUsuario);
    router.post('/', verifyJWT,verifyUserDisabled,createAddress);
    router.put('/:addressId', verifyJWT,foundAgenda, checkAddressVsUserId,verifyUserDisabled, updateAddress);
    router.delete('/:addressId',verifyJWT,foundAgenda, checkAddressVsUserId,verifyUserDisabled,deleteAddress);

    return router;

}


/////////////////////////////////////////////////////////////
// Exportamos 

module.exports={
    agendaRouter
}