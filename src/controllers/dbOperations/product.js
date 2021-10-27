/////////////////////////////////////////////////////////////
// Variables Iniciales


const { getModel } = require("../../database");


/////////////////////////////////////////////////////////////
// Funciones


//1
const getProductsDB = async ()=>{

    try{

        const Product= getModel("Product");
        const dataDB = await Product.findAll();
        return dataDB


    }catch(error){
        console.log(error);
    }

}

//2 
const createProductDB = async (product) =>{

    try {

        const Product = getModel("Product");
        const data = new Product(product);
        await data.save();

    }catch(error){
        console.log(error)
    }

}

//3 Actualizamo en la DB
const updateProductDB = async (id, payload)=>{

    try{

        const Product = getModel("Product");
        let productFound = await Product.findOne({
            where:{
                id
            }
        })


        productFound.name = payload.name;
        productFound.description = payload.description;
        productFound.picture = payload.picture;
        productFound.price = payload.price

        await productFound.save()

    }catch(error){
        console.log(error);
    }

}

//4- DB Delete
const deleteProductDB = async (id)=>{

    try{

        const Product = getModel("Product");
        let productoFound= await Product.findOne({
            where:{
                id
            }
        })

        await productoFound.destroy();

    }catch(error){
        console.log(error);
    }

}


/////////////////////////////////////////////////////////////
// Exportamos


module.exports={
  
    getProductsDB,
    createProductDB,
    updateProductDB,
    deleteProductDB
}
