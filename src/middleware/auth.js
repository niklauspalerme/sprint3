const jwt = require('jsonwebtoken');
const { getModel } = require("../database");



//
const authorize = async (req,resp,next)=>{

    try {

        const JWT_PASS = global.process.env.JWT_PASS;
        const {username,email,password}= req.body 
        const User = getModel('User');

        //Si no existe el email
        if(email === undefined)
            result = await User.findOne({where:{username}});
        else 
            result = await User.findOne({where:{email}}) 

        const token = jwt.sign(result.toJSON(), JWT_PASS,{ expiresIn: '1h' });
        
        resp.status(200).json({"token": `Bearer ${token}`});
        
    } catch (error) {
        console.log(error);
        resp.status(500).send(error);
    }
}


// Middlere #2  - Verificación del token USER
const verifyJWT = async (req,resp,next)=>{

    let token = req.headers.authentication || ''
    const JWT_PASS = global.process.env.JWT_PASS;

    console.log("Local Middleware -----> verifyJWT");

    if (token === '')
        resp.status(406).json({"Message": "Se requiere el Header authentication"});
    else{
        
        token = token.replace('Bearer ', '');

        jwt.verify(token, JWT_PASS, function(error, decoded) {
            if (error) 
                resp.status(401).json({"Message": "Credenciales Invalidas o Expiró el token"});
            else {
                next();
            }
        });

    }

}


// Middlere #3  - Verificación del token ADMINS
const verifyJWTAdmins = async (req,resp,next)=>{

    let token = req.headers.authentication || ''
    const JWT_PASS = global.process.env.JWT_PASS;

    console.log("Local Middleware -----> verifyJWTAdmins");

    if (token === '')
        resp.status(406).json({"Message": "Se requiere el Header authentication"});
    else{
        
        token = token.replace('Bearer ', '');

        jwt.verify(token, JWT_PASS, function(error, decoded) {
            if (error) 
                resp.status(401).json({"Message": "Credenciales Invalidas o expiró el token"});
            else {
                if(decoded.admins === true)
                    next()
                else
                    resp.status(403).json({"Message": "Operación Prohibida. No tiene los permisos suficientes"});
            }

        });

    }
}


const verifyUserDisabled = async (req,resp,next)=>{

    let token = req.headers.authentication || ''
    const JWT_PASS = global.process.env.JWT_PASS;

    console.log("Local Middleware -----> verifyUserDisabled");

    if (token === '')
        resp.status(406).json({"Message": "Se requiere el Header authentication"});
    else{
        
        token = token.replace('Bearer ', '');

        jwt.verify(token, JWT_PASS, function(error, decoded) {
            if (error) 
                resp.status(401).json({"Message": "Credenciales Invalidas o expiró el token"});
            else {
                if(decoded.disabled === true)
                    resp.status(403).json({"Message": "Operación Prohibida. El usuario esta suspendido"});
                else
                  next();
            }

        });

    }
}



module.exports={
    authorize,
    verifyJWT,
    verifyJWTAdmins,
    verifyUserDisabled
}