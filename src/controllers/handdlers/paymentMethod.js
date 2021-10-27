/////////////////////////////////////////////////////////////
// Variables Iniciales


const { getPaymentMethodDB, createPaymentMethodDB, updatePaymentMethodDB, deletePaymentMethodDB } = require("../dbOperations/paymentMethod")


/////////////////////////////////////////////////////////////
// Funciones

//1- Obtener Medios de pagos
const getPaymentMethod = async (req,resp)=>{

   try{

        const dataDB = await getPaymentMethodDB();
        resp.status(200).json(dataDB)

       
   }catch(error){
       console.log(error)
       resp.status(500).send(error)
   }

}


//2- Cremaos un Medio de Pago
const createPaymentMethod =  async (req,resp)=>{

    try{
  
        await createPaymentMethodDB (req.body);
        resp.status(201).json({"Message": "Se ha creado un nuevo metodo de pago"});
        
    }catch(error){
        console.log(error)
        resp.status(500).send(error)
    }
 
 }


// 3- Actualizamos un Medio de Pago
const updatePaymentMethod = async (req,resp)=>{

    try{

        const {id} = req.params;
        await updatePaymentMethodDB(id, req.body)
        resp.status(200).json({"Message": "El metodo de pago ha sido actualizado"})

    }catch(error){
        console.log(error)
        resp.status(500).send(error)
    }


}

const deletePaymentMethod = async (req,resp)=>{

    try{

        const {id}= req.params;
        await deletePaymentMethodDB(id);
        resp.status(200).json({"Message": "El metodo de pago ha sido eliminado"});

    }catch(error){
        console.log(error)
        resp.status(500).send(error)
    }
}


/////////////////////////////////////////////////////////////
// Exportamos


module.exports ={
    getPaymentMethod,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
}



