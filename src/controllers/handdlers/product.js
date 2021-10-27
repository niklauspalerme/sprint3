/////////////////////////////////////////////////////////////
// Variables Iniciales

const { getProductsDB, createProductDB, updateProductDB, deleteProductDB } = require("../dbOperations/product")




/////////////////////////////////////////////////////////////
// Funciones


//1
const getProducts = async (req,resp)=>{

   try{

        const dataDB = await getProductsDB();
        //Invocamos la funcion creada en el Middleware Cache
        req.cache(dataDB);
        resp.status(200).json(dataDB)

       
   }catch(error){
       console.log(error)
       resp.status(500).send(error)
   }

}


//2
const createProduct =  async (req,resp)=>{

    try{
  
        await createProductDB(req.body)
        resp.status(201).json({"Message": "Se ha creado un nuevo producto"});
        
    }catch(error){
        console.log(error)
        resp.status(500).send(error)
    }
 
 }


//3
const updateProduct = async (req,resp)=>{

    try{

        const {id} = req.params;

        await updateProductDB(id, req.body);
        resp.status(200).json({"Message": "El producto se ha actualizado"});


    }catch(error){
        console.log(error)
        resp.status(500).send(error)
    }


}


//4
const deleteProduct = async (req,resp)=>{

    try{

        const {id}= req.params;
        await deleteProductDB(id);
        resp.status(200).json({"Message": "El producto ha sido eliminado"});

    }catch(error){
        console.log(error)
        resp.status(500).send(error)
    }
}


/////////////////////////////////////////////////////////////
// Exportamos


module.exports ={
 getProducts,
 createProduct,
 updateProduct,
 deleteProduct
}



