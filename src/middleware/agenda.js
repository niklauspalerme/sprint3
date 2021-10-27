const { getModel } = require("../database")
const jwt = require('jsonwebtoken');
const { checkAddressVsUserIdDB } = require("../controllers/dbOperations/agenda");


//1
const foundAgenda = async (req,resp,next)=>{

    const Agenda= getModel("Agenda");

    console.log("Local Middleware -----> foundAgenda");

    let agendaFound = await Agenda.findOne({
        where:{
            id: req.params.addressId
        }
    })

    if (agendaFound === null)
        resp.status(404).json({"Message": "No se encuentra la dirección"})
    else
        next()

}


//2
const foundAgendaOrder = async (req,resp,next)=>{

    const Agenda= getModel("Agenda");

    console.log("Local Middleware -----> foundAgendaOrder");

    let agendaFound = await Agenda.findOne({
        where:{
            id: req.body.addressId
        }
    })

    if (agendaFound === null)
        resp.status(404).json({"Message": "No se encuentra la dirección"})
    else
        next();

}


//3
const checkAddressVsUserId = async (req,resp,next)=>{

    try {
        
        let token = req.headers.authentication || ''
        let UserId = ""
        const {addressId}= req.params || '';
        const JWT_PASS = global.process.env.JWT_PASS;

        token = token.replace('Bearer ', '');

        console.log("Local Middleware -----> checkAddressVsUserId");


        jwt.verify(token, JWT_PASS, (error, decoded) => {
            if (error) 
                resp.status(401).json({"Message": "Credenciales Invalidas"})
            else 
                UserId = decoded.id;
        });

        const result = await checkAddressVsUserIdDB(addressId,UserId);

        if (result !== null)
            next();
        else
            resp.status(403).json({"Message": "Operación Prohibida, coloque otro AddressId"});


    } catch (error) {
       console.log(error);
       resp.status(500).send(error);
    }
}



//4
const checkAddressVsUserIdOrder = async (req,resp,next)=>{

    try {
        
        let token = req.headers.authentication || '';
        let UserId = ""
        const {addressId}= req.body || '';
        const JWT_PASS = global.process.env.JWT_PASS;

        console.log("Local Middleware -----> checkAddressVsUserIdOrder");

        token = token.replace('Bearer ', '');

        jwt.verify(token, JWT_PASS, (error, decoded) => {
            if (error) 
                resp.status(401).json({"Message": "Credenciales Invalidas"})
            else 
                UserId = decoded.id;
        });

        const result = await checkAddressVsUserIdDB(addressId,UserId);

        if (result !== null)
            next();
        else
            resp.status(403).json({"Message": "Operación Prohibida, coloque otro addressId"});


    } catch (error) {
       console.log(error);
       resp.status(500).send(error);
    }
}


module.exports= {
    foundAgenda,
    foundAgendaOrder,
    checkAddressVsUserId,
    checkAddressVsUserIdOrder
}