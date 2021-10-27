/////////////////////////////////////////////////////////////
// Variables Iniciales


const { getOrdersDB, getOrdersClientDB, createOrderDB, createTotalPriceNewOrder, getOrderDB, deleteOrderDB, updateOrderDB, updateOrderProduct, updateStateOrderDB } = require("../dbOperations/order");
const jwt = require('jsonwebtoken');


/////////////////////////////////////////////////////////////
// Funciones


//1
const getOrders = async (req,resp) =>{

    try{

        const data = await getOrdersDB();
        resp.status(200).json(data);

    }catch(error){

        console.log(error)
        resp.status(500).send(error)
    }

}


//2
const getOrderClient = async (req,resp)=>{

    try{

        let token = req.headers.authentication || '';
        const JWT_PASS = global.process.env.JWT_PASS;
        let UserId = "";
        
        token = token.replace('Bearer ', '');

        jwt.verify(token, JWT_PASS, (error, decoded) => {
            if (error) 
                resp.status(401).json({"Message": "Credenciales Invalidas"})
            else 
                UserId = decoded.id;
        });

        const data = await getOrdersClientDB(UserId)
        resp.status(200).json(data);

    }catch(error){

        console.log(error)
        resp.status(500).send(error)
    }

}


//3
const createOrder = async (req,resp)=>{

    try{

        let token = req.headers.authentication || '';
        const JWT_PASS = global.process.env.JWT_PASS;
        let UserId = "";
        const {addressId,paymentMethodId}= req.body;
        const products = req.body.products
        let orderId = ""
        

        token = token.replace('Bearer ', '');


        jwt.verify(token, JWT_PASS, (error, decoded) => {
            if (error) 
                resp.status(401).json({"Message": "Credenciales Invalidas"})
            else 
                UserId = decoded.id;
        });
       
        orderId =  await createOrderDB(UserId, addressId, paymentMethodId, products)

        await createTotalPriceNewOrder(orderId);

        resp.status(200).json({"Message": `Se ha creado exitosamente la orden: ${orderId}` });

    }catch(error){

        console.log(error)
        resp.status(500).send(error)
    }



}


//4 - Obtenemos una orden en especifico
const getOrder = async (req,resp)=>{
   
    try {

        const id = req.params.orderId;
        const data = await getOrderDB (id);
        resp.status(200).json(data);

    } catch (error) {
        console.log(error)
        resp.status(500).send(error)
    }

}


//5
const deleteOrder =  async (req,resp)=>{
   
    try {

        const id = req.params.orderId;
        const data = await deleteOrderDB(id);

        resp.status(200).json({"Message": `La orden ${id} ha sido eliminada`})

    } catch (error) {
        console.log(error)
        resp.status(500).send(error)
    }

}


//6
const updateOrder = async (req,resp)=>{

    try {

    const orderId = req.params.orderId;
    const {addressId, paymentMethodId,products}= req.body;

    await updateOrderDB(orderId, addressId,paymentMethodId);
    await updateOrderProduct(orderId, products);
    await createTotalPriceNewOrder(orderId);
    
    resp.status(200).json({"Message": `La orden ${orderId} ha sido actualizada`})

    } catch (error) {
        console.log(error)
        resp.status(500).send(error)
    }

}


//7
const updateOrderState = async (req,resp)=>{

    try {

        const orderId = req.params.orderId;
        const {state}= req.body;

        await updateStateOrderDB(orderId,state)
    
        resp.status(200).json({"Message": `La orden ${orderId} ha sido actualizada su state`})
    
        } catch (error) {
            console.log(error)
            resp.status(500).send(error)
        }
}



/////////////////////////////////////////////////////////////
// Exportamos

module.exports = {
    getOrders,
    getOrderClient,
    createOrder,
    getOrder,
    deleteOrder,
    updateOrder,
    updateOrderState
}