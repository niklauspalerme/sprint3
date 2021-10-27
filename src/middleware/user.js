const jwt = require('jsonwebtoken');
const { getModel } = require("../database");
const db = require("../database");


//1 - Valimdamos la existencia del usuario en Login
const userFound = async (req,resp,next)=>{

    try {

        const {username,email, password}= req.body 
        const User = getModel('User');
        let result = null
        let decodedPassword = ""

        //Si no existe el email
        if(email === undefined)
            result = await User.findOne({where:{username}});
        else 
            result = await User.findOne({where:{email}}) 

        if(result === null)
            resp.status(404).json({"Message": "El usuario no existe"});
        
        decodedPassword = jwt.verify(result.password, global.process.env.JWT_PASS)
        
        if(decodedPassword.password === password)
            next();
        else
            resp.status(401).json({"Message": "Contraseña Incorrecta"});

        
    } catch (error) {
        console.log(error);
        resp.status(500).send(error);
    }

}


//2
const verifyUserId= async (req,resp,next)=>{

    let token = req.headers.authentication || ''
    const JWT_PASS = global.process.env.JWT_PASS;
    const userId = req.params.userId;
    const User = getModel('User');

    console.log("Local Middleware -----> verifyUserId");

    const userFound = await User.findOne(
        {where:{
            id: userId
        }})

    if (token === '')
        resp.status(406).json({"Message": "Se requiere el Header authentication"});
    else{
        
        token = token.replace('Bearer ', '');

        jwt.verify(token, JWT_PASS, function(error, decoded) {
            if (error) 
                resp.status(401).json({"Message": "Credenciales Invalidas"});
            else {
                if(decoded.admins === true){
                    console.log(decoded.admins === true);
                    console.log("Hello");
                    next();
                }
                    
                else if (decoded.id === userFound.dataValues.id){
                        console.log(decoded.id === userFound.dataValues.id);
                        next();
                    }
                        
                else
                    resp.status(403).json({"Message": "Operación Prohibida. Este no es su usuario"});
            }

        });

    }

}


//3
const checkUserId = async (req,resp,next)=>{
    try {
        const userId = req.params.userId;
        const User = getModel('User');
    
        console.log("Local Middleware -----> checkUserId");
    
        const userFound = await User.findOne(
            {where:{
                id: userId
            }})
    
        if (userFound === null)
            resp.status(404).json({"Message": "No se encontro el usuario"});
        else
            next();
    } catch (error) {
        console.log(error);
        resp.status(500).json(Error);
    }
}


//4 - Validamos los datos del user antes de crearlo en la DB
const validateExistingUser = async (req,resp,next)=>{
    try {
        
        const {username,email}= req.body 
        const User1 = db.getModel('User');
        const User2 = db.getModel('User');
    
        console.log("Local Middleware -----> validateExistingUser");
    
        const userFound1 = await User1.findOne(
            {where:{
                username
            }})

        const userFound2 = await User2.findOne(
            {where:{
                email
            }})
    
        if (userFound1 === null && userFound2 === null)
           next();
        else if (userFound1 !== null)
            resp.status(403).json({"Message": "Operación Prohibida. El username ya esta registrado. Intente con otro"});
        else
            resp.status(403).json({"Message": "Operación Prohibida. El email ya esta registrado. Intente con otro"});

    } catch (error) {
        console.log(error);
        resp.status(500).json(Error);
    }
}



module.exports={
    userFound,
    verifyUserId,
    checkUserId,
    validateExistingUser
}