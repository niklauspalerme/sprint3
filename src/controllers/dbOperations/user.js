/////////////////////////////////////////////////////////////
// Variables Iniciales

const { getModel, dbConexion } = require("../../database");
const jwt = require('jsonwebtoken');
const db = require("../../database");


/////////////////////////////////////////////////////////////
// Funciones


//1
const getAllUsersDB = async ()=>{

    try {

        const User = getModel('User');
        const data =  await User.findAll();
        return data;
        
    } catch (error) {
        console.log(error);
    }

}


//2
const getOneUserDB = async (token)=>{

    try {

        const JWT_PASS = global.process.env.JWT_PASS;
        let id = ''
        const User = getModel('User');    
            
        token = token.replace('Bearer ', '');
    
        jwt.verify(token, JWT_PASS, function(error, decoded) {
            if (error) 
                console.log(error);
            else 
                id = decoded.id 
            });

        const userFound = await User.findOne({
            where:{
                    id
                },
            attributes: ["id", "username", "name","email", "mobile", "disabled"]
        })
        
        return userFound;

    }catch (error) {
        console.log(error);
    }
}


//3
const deleteUserDB = async (id)=>{

    try {

        const User = getModel('User');    
        const userFound = await User.findOne({
            where:{
                    id
                }
        })

        await userFound.destroy();
        

    }catch (error) {
        console.log(error);
    }

}

//4 Borra las direcciones de ese usuario
const deleteAddressUserDB  = async (UserId)=>{

    try {

        const db = dbConexion(); 
        await db.query(
            `DELETE FROM agenda
            WHERE UserId = ${UserId}`, 
        {
            type: db.QueryTypes.DELETE
        }); 

    }catch (error) {
        console.log(error);
    }

}


//5 - Creamos usuario en DB
const createUserDB = async (user)=>{

    try {

        const secretKey = global.process.env.JWT_PASS || "1234567890";
        const password = user.password;
        const encryptedPassword = jwt.sign({password}, secretKey );
        user.password = encryptedPassword

        const User = db.getModel('User');    
        const data = await User.create(user);

        return data.dataValues.id
      

    }catch (error) {
        console.log(error);
    }

}


//6- Actualizamos el disabled user
const updateDisabledUserDB = async (id, disabled) =>{
    
    try {
        const User = getModel('User');
        const userFound = await User.findOne({
            where:{
                id
            }
        })    

        userFound.disabled=disabled;
        await userFound.save();
      
    }catch (error) {
        console.log(error);
    }

}


//7- Actualizamos attributos del usuario
const updateUserDB = async (token, name, mobile) =>{
    
    try {

        const JWT_PASS = global.process.env.JWT_PASS;
        let id = ''
        const User = getModel('User');    
            
        token = token.replace('Bearer ', '');
    
        jwt.verify(token, JWT_PASS, function(error, decoded) {
            if (error) 
                console.log(error);
            else 
                id = decoded.id 
            });

        const userFound = await User.findOne({
            where:{
                    id
                }
        })

        userFound.name= name;
        userFound.mobile=mobile;
        await userFound.save();
        
    } catch (error) {
        
    }

}


/////////////////////////////////////////////////////////////
// Exportamos

module.exports={
    getAllUsersDB,
    getOneUserDB,
    deleteUserDB,
    createUserDB,
    updateDisabledUserDB,
    deleteAddressUserDB,
    updateUserDB
}
