/////////////////////////////////////////////////////////////
// Variables Iniciales 

const {Router} = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/handdlers/product");
const { verifyJWT, verifyJWTAdmins } = require("../middleware/auth");
const { cache, cleanCache } = require("../middleware/cache");
const { foundProduct } = require("../middleware/product");


/////////////////////////////////////////////////////////////
// Función Principal


const productRouter = () =>{


    const router = new Router();

    router.get('/', verifyJWT,cache,getProducts);
    router.post('/', verifyJWTAdmins,cleanCache,createProduct);
    router.put('/:id', foundProduct, cleanCache, verifyJWTAdmins, updateProduct);
    router.delete('/:id',foundProduct,cleanCache, verifyJWTAdmins,deleteProduct);

    return router;

}



/////////////////////////////////////////////////////////////
// Exportamos 

module.exports={
    productRouter
}