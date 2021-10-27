/////////////////////////////////////////////////////////////
// Variables Iniciales

const { getModel } = require("../../database");
const db = require("../../database");


/////////////////////////////////////////////////////////////
// Funciones


//1
const getAgendaDB = async () => {

    try{

        const Agenda = getModel('Agenda');
        const data = await Agenda.findAll();
        return data

    }catch(error){
        console.log(error);
    }

}

//2
const createAddressDB = async (address, UserId)=>{

    try{

        const agenda = {
            address,
            UserId
        }

        const Agenda = db.getModel('Agenda');
        const data = await Agenda.create(agenda);
        //const data = new Agenda (agenda);
        

    }catch(error){
        console.log(error);
    }

}



//3
const getAgendaUsuarioDB = async (UserId) => {

    try{

        const Agenda = getModel('Agenda');
        const data = await Agenda.findAll({
            where:{
                UserId
            }
        });
        return data

    }catch(error){
        console.log(error);
    }

}


//4
const updateAddressDB = async (id, address) =>{
    
    try{

        const Agenda = getModel('Agenda');
        const addressFound = await Agenda.findOne({
            where:{
                id
            }
        });
        
        addressFound.address = address;
        await addressFound.save()

    }catch(error){
        console.log(error);
    }
}

//5
const checkAddressVsUserIdDB = async (id, UserId)=>{
    try{

        const Agenda = getModel('Agenda');
        const addressFound = await Agenda.findOne({
            where:{
                id,
                UserId
            }
        });
        
        return addressFound;

    }catch(error){
        console.log(error);
    }
}


//5 - Chequeamos la existencia de la orden con el usuerioa
const checkOrderVsUserIdDB = async (id, UserId)=>{
    try{

        const Agenda = getModel('Order');
        const OrderFound = await Agenda.findOne({
            where:{
                id,
                UserId
            }
        });
        
        return orderFound;

    }catch(error){
        console.log(error);
    }
}



//6
const deleteAddressDB = async (id) => {
    try{

        const Agenda = getModel('Agenda');
        const addressFound = await Agenda.findOne({
            where:{
                id
            }
        });
        
        await addressFound.destroy();

    }catch(error){
        console.log(error);
    }
}



/////////////////////////////////////////////////////////////
// Exportamos

module.exports={
    getAgendaDB,
    createAddressDB,
    getAgendaUsuarioDB,
    updateAddressDB,
    checkAddressVsUserIdDB,
    deleteAddressDB,
    checkOrderVsUserIdDB 
}
