/////////////////////////////////////////////////////////////
// Variables Iniciales 

const {Router} = require("express");
const { getAllUsers, getOneUser, deleteUser, createUser, updateDisabledUser, updateUser } = require("../controllers/handdlers/user");
const { authorize, verifyJWTAdmins, verifyJWT, verifyUserDisabled } = require("../middleware/auth");
const { userFound, verifyUserId, checkUserId, validateExistingUser } = require("../middleware/user");


/////////////////////////////////////////////////////////////
// Función Principal


const userRouter = () =>{


    const router = new Router();

    router.post('/login',userFound,authorize);
    router.get('/admins', verifyJWTAdmins, getAllUsers);
    router.get('/', verifyJWT, getOneUser);
    router.put('/',verifyJWT,verifyUserDisabled,updateUser);
    router.post('/signin', validateExistingUser,createUser);
    router.put('/admins/disabled/:userId', verifyJWTAdmins,checkUserId, updateDisabledUser );
    router.delete('/:userId',verifyJWTAdmins,checkUserId,deleteUser);

    return router;

}


/////////////////////////////////////////////////////////////
// Exportamos 

module.exports={
    userRouter
}