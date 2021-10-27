/////////////////////////////////////////////////////////////
// Variables Iniciales


const { getModel } = require("../../database");


/////////////////////////////////////////////////////////////
// Funciones


//1- Obtenemos de la DB los Medios de Pagos
const getPaymentMethodDB = async ()=>{

    try{

        const PaymentMethod = getModel("PaymentMethod");
        const dataDB = await PaymentMethod.findAll();
        return dataDB


    }catch(error){
        console.log(error);
    }

}

//2 - Creamo en DB un metodo de pago
const createPaymentMethodDB = async (name) =>{

    try {

        const PaymentMethod = getModel("PaymentMethod");
        const data = new PaymentMethod(name);
        await data.save();

    }catch(error){
        console.log(error)
    }

}

//3 Actualizamo en la DB
const updatePaymentMethodDB = async (id, payload)=>{

    try{

        const PaymentMethod = getModel("PaymentMethod");
        let paymentFound = await PaymentMethod.findOne({
            where:{
                id
            }
        })

        paymentFound.name = payload.name;
        await paymentFound.save()

    }catch(error){
        console.log(error);
    }

}

//4- DB Delete
const deletePaymentMethodDB = async (id)=>{

    try{

        const PaymentMethod = getModel("PaymentMethod");
        let paymentFound = await PaymentMethod.findOne({
            where:{
                id
            }
        })

        await paymentFound.destroy();

    }catch(error){
        console.log(error);
    }

}


/////////////////////////////////////////////////////////////
// Exportamos


module.exports={
    getPaymentMethodDB,
    createPaymentMethodDB,
    updatePaymentMethodDB,
    deletePaymentMethodDB
}
