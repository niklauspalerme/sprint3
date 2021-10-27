/////////////////////////////////////////////////////////////
// Variables Iniciales

const { getAgendaDB, createAddressDB, getAgendaUsuarioDB, updateAddressDB, deleteAddressDB } = require("../dbOperations/agenda")
const jwt = require('jsonwebtoken');


/////////////////////////////////////////////////////////////
// Funciones


//1
const getAgenda = async (req,resp)=>{

    try{

        const data = await getAgendaDB();
        resp.status(200).json(data);

    }catch(error){

        console.log(error)
        resp.status(500).send(error)
    }

}


//2
const createAddress = async (req,resp)=>{

    try {
        
        let token = req.headers.authentication || '';
        const {address} = req.body;
        let UserId = "";
        const JWT_PASS = global.process.env.JWT_PASS;

        token = token.replace('Bearer ', '');


        jwt.verify(token, JWT_PASS, (error, decoded) => {
            if (error) 
                resp.status(401).json({"Message": "Credenciales Invalidas"})
            else 
                UserId = decoded.id;
        });

        await createAddressDB(address,UserId);
        resp.status(201).json({"Message": "Se ha creado una nueva agenda"});


    } catch (error) {
       console.log(error)
       resp.status(500).send(error)
    }

}


// Handdler #3 - Obtener todas las direcciones del usuario
const getAgendaUsuario = async (req,resp)=>{

    try {
        
        let token = req.headers.authentication || ''
        let UserId = ""
        const JWT_PASS = global.process.env.JWT_PASS;

        token = token.replace('Bearer ', '');

        jwt.verify(token, JWT_PASS, (error, decoded) => {
            if (error) 
                resp.status(401).json({"Message": "Credenciales Invalidas"})
            else 
                UserId = decoded.id;
        });

        const result = await getAgendaUsuarioDB(UserId);
        resp.status(200).json(result);

    } catch (error) {
       console.log(error);
       resp.status(500).send(error);
    }
}


//4
const updateAddress = async (req,resp)=>{

    try{

        const {addressId} = req.params;
        const {address} = req.body;
        await updateAddressDB(addressId, address);
        resp.status(200).json({"Message": "La direccón ha sido actualizado"})

    }catch{
        console.log(error);
        resp.status(500).send(error);
    }

}


//5
const deleteAddress = async (req,resp)=>{

    try{

        const {addressId} = req.params;
        await deleteAddressDB(addressId)
        resp.status(200).json({"Message": "La direccón ha sido eliminada"})

    }catch{
        console.log(error);
        resp.status(500).send(error);
    }

}


/////////////////////////////////////////////////////////////
// Exportamos

module.exports={
    getAgenda,
    createAddress,
    getAgendaUsuario,
    updateAddress,
    deleteAddress
}