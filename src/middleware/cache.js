const redisDb = require('redis');
const redis = redisDb.createClient();

redis.on("error", function(error) {
    console.error(error);    
});


function cache(req, res, next) {

    const url = req.url;

    console.log("Local Middleware -----> Cache");

    redis.get(url, (err, cached) => {
        
        //Si hay data en la cache
        if (cached) {
            console.log("Local Middleware -----> Usando Cache");
            res.status(200).json(JSON.parse(cached));
        }else{
           
            //Creamos una funcion una data al cache
            req.cache = (data) => {
                console.log("Local Middleware -----> Guandado en Cache");
                redis.set(req.url, JSON.stringify(data));
            }

            next();
            
        }
    })
}

function cleanCache (req,resp,next){

    const url = '/'
    console.log("Local Middleware -----> CleanCache");
    redis.DEL(url);
    next();


}

module.exports = {
    cache,
    cleanCache
}