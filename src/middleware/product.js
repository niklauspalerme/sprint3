const { getModel } = require("../database")


//1
const foundProduct = async (req,resp,next)=>{

   try {

        const Product= getModel("Product");

        console.log("Local Middleware -----> foundProduct");

        let productFound = await Product.findOne({
            where:{
                id: req.params.id
            }
        })

        if (productFound === null)
            resp.status(404).json({"Message": "No se encuentra el producto"})
        else
            next();
       
   } catch (error) {
       console.log(error);
   }

}


//2
const foundProductsOrder = async (req,resp,next)=>{

    try {

        const Product= getModel("Product");
        const products = req.body.products || '';
        let productsFound = []

        console.log("Local Middleware -----> foundProductsOrder");

        console.log(products.length);

        if (products.length === 0)
            resp.status(404).json({"Message": "No se encuentra el producto"});
        else
            for(let i =0 ; i < products.length ; i ++){
                productsFound.push(
                    await Product.findOne({
                        where:{ id: products[i].productId}
                    })
                )
            }
        
        productsFound = productsFound.every( product => product !== null);

        if(productsFound == true)
            next();
        else
            resp.status(404).json({"Message": "No existe el productId"}); 
       
   } catch (error) {
       console.log(error);
   }
        
}


module.exports= {
    foundProduct,
    foundProductsOrder
}