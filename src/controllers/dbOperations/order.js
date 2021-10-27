/////////////////////////////////////////////////////////////
// Variables Iniciales

const { getModel, dbConexion } = require("../../database");


/////////////////////////////////////////////////////////////
// Funciones


//1
const getOrdersDB = async ()=>{
    try{

        const Order = getModel('Order');
        const data = await Order.findAll();
        return data

    }catch(error){
        console.log(error);
    }
}


//2
const getOrdersClientDB = async (UserId)=>{
    try{
        const Order = getModel('Order');
        const data = await Order.findAll({
            where:{
                UserId
            }
        });
        return data

    }catch(error){
        console.log(error);
    }
}


//3
const createOrderDB = async (UserId,AgendaId, PaymentMethodId, products) =>{

    try {

        const state = "Processing";
        
        //Insertamos en Order
        let order = {
            state,
            UserId,
            AgendaId,
            PaymentMethodId
        }
        
        const Order = getModel("Order");
        const dataOrder = new Order(order);
        await dataOrder.save();
        const orderId= dataOrder.dataValues.id;


        //Insertamos en OrderProduct
        for(let i = 0; i< products.length ; i++)
            await createOrderProductDB (orderId, products[i].productId, products[i].quantity);
        
        //Devolvemos el id de la orden
        return orderId
                
    } catch (error) {
        console.log(error);
    }
}


//4
const createOrderProductDB = async (OrderId, ProductId, quantity)=>{

    try {

        const orderproduct = {
            OrderId,
            ProductId,
            quantity
        }
        const OrderProduct = getModel("OrderProduct");
        const dataOrderProduct = new OrderProduct(orderproduct);
        await dataOrderProduct.save();
        
    } catch (error) {
        console.log("Error en createOrderProductDB.....", error);
    }

}


//5
const createTotalPriceNewOrder= async (orderId)=>{
    try {
        
        const db = dbConexion();
        const Order = getModel('Order');
        let totalPrice = 0;

        //Vemos todos los productos asociados a la orden

        const data= await db.query(
            `SELECT 
            o.quantity,
            p.price,
            p.name 
            FROM orderproduct AS o
            LEFT JOIN product AS p ON p.id = o.ProductId
            WHERE o.OrderId = ${orderId}`, 
            { type: db.QueryTypes.SELECT }
        ).then(ordenes => ordenes)

        //Hacemos la sumatoria total de esos productos

        for ( let i = 0; i < data.length; i ++)
            totalPrice+= data[i].quantity * data[i].price


        //Actualizamos el Precio
        let orderFound =  await Order.findOne({
            where:{
                id: orderId
            }
        })

        orderFound.totalPrice = totalPrice;
        await orderFound.save();
     
    }catch (error) {
        console.log("Error en createTotalPriceNewOrder......", error);
    }
} 


//6) Obtenemos todos los datos relacionados
// a una orden es especifico
const getOrderDB = async (id) =>{

    try {

        const db = dbConexion();
        const Order = getModel('Order');
        const User = getModel('User');
        const Agenda = getModel('Agenda');
        const PaymentMethod = getModel('PaymentMethod');
        const Product = getModel('Product');

        let data = await Order.findAll({
            attributes: [['id', 'OrderId'],'state', 'totalPrice'],
            where:{
                id
            },
            include:[
                {model: User, attributes: ['username', 'email']},
                {model: Agenda, attributes: ['address']},
                {model: PaymentMethod, attributes:['name']},
                {model: Product, attributes:['name', 'price']}
            ]
        })

        /*
        const data2= await db.query(
                `SELECT 
                o.quantity,
                p.price,
                p.name 
                FROM orderproduct AS o
                LEFT JOIN product AS p ON p.id = o.ProductId
                WHERE o.OrderId = ${id}`, 
                { type: db.QueryTypes.SELECT }
            ).then(ordenes => ordenes)
        */
        
        //Reemplazamos la info del atributo products (updatedAt) de data
        //Por el resultado de la query de data2
        //data[0].dataValues.products = data2;

        return data;
        
    } catch (error) {
        console.log("Error en getOrderDB......", error);
    }

}


//7
const deleteOrderDB = async (id)=>{
    
    try {

        const Order = getModel('Order');
    
        let data = await Order.findOne({
            where:{
                id
            }
        })

        await data.destroy();

    } catch (error) {
        console.log("Error en getOrderDB......", error);
    }
}


//8
const updateOrderDB = async (id,AgendaId, PaymentMethodId)=>{
    try {

        const Order = getModel('Order');
    
        let orderFound = await Order.findOne({
            where:{
                id
            }
        })

        orderFound.AgendaId= AgendaId;
        orderFound.PaymentMethodId = PaymentMethodId;
        await orderFound.save();

    } catch (error) {
        console.log("Error en getOrderDB......", error);
    }

}


//9
const updateOrderProduct = async (id, products) =>{

    try {

        const OrdeProduct = getModel('OrderProduct');
    
        const db = dbConexion();

        await db.query(
            `DELETE FROM orderproduct WHERE OrderId=${id}`, 
            { type: db.QueryTypes.DELETE }
        );
        

        //Insertamos los nuevos Productos
        for(let i = 0; i< products.length ; i++)
            await createOrderProductDB (id, products[i].productId, products[i].quantity);

    } catch (error) {
        console.log("Error en getOrderDB......", error);
    }

}


//10

const checkOrderVsUserIdDB = async (id, UserId) =>{

    const Order = getModel('Order');
    
    let orderFound = await Order.findOne({
        where:{
            id,
            UserId
        }
    })

    return orderFound;

}


//11
const updateStateOrderDB = async (id,state)=>{
    try {

        const Order = getModel('Order');
        let orderFound = await Order.findOne({
            where:{
                id
            }
        })

        orderFound.state=state
        await orderFound.save();

    } catch (error) {
        console.log("Error en updateStateOrderDB......", error);
    }

}



/////////////////////////////////////////////////////////////
// Exportamos

module.exports = {
    getOrdersDB,
    getOrdersClientDB,
    createOrderDB,
    createTotalPriceNewOrder,
    getOrderDB,
    deleteOrderDB,
    updateOrderDB,
    updateOrderProduct,
    checkOrderVsUserIdDB,
    updateStateOrderDB
}