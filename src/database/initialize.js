const { getModel } = require(".");
const jwt = require("jsonwebtoken");

async function initialize() {

  try{

    const User = getModel('User');
    const PaymentMethod = getModel('PaymentMethod');
    const Product = getModel('Product');

    const resultUser = await User.findAll();
    const resultPaymentMethod = await PaymentMethod.findAll();
    const resultProduct = await Product.findAll();

    //User
    if (resultUser.length === 0 ){
     
        console.log("Entro aca");

        const password = "admins";
        encryptedPassword = jwt.sign({password},  global.process.env.JWT_PASS);

        await User.create({
            username: 'admins',
            name: 'admins',
            email: "admins@gmail.com",
            mobile: '11-2254-4572',
            password:  encryptedPassword,
            admins: true,
            disabled: false
        });
    }

    //Payment Method
    if (resultPaymentMethod.length === 0){

        await PaymentMethod.create({
            name: "Debito"
        });

        await PaymentMethod.create({
            name: "Efectivo"
        });

        await PaymentMethod.create({
            name: "Credito"
        });
    }

    //Products
    if (resultProduct.length === 0){

        await Product.create({
            name: "Hambuguesa Funsión Japo-Mex",
            description: " Hamburguesa de 150gr de carne, guacamole, cilandro, tomate, wasabi, lechuga romana",
            picture: "https://live.staticflickr.com/3406/3410455398_6a8829d9fc_b.jpg",
            price: 750
        })

        await Product.create({
            name: "Hamburguesa Clasica",
            description: "Hamburguesa de 150gr de carne, tomate, queso y lechuga",
            picture: "https://live.staticflickr.com/2166/2045508874_2d86d5370d_b.jpg",
            price: 450
        })

        await Product.create({
            name: "Hamburguesa Poderosa",
            description: "Hamburguesa de 250gr de carne, lechuga, tomate, pepinillos. salta tartara y queso cheddar",
            picture: "https://live.staticflickr.com/8471/8128967697_65160078b7_b.jpg",
            price: 800
        })

        await Product.create({
            name: "Hamburguesa Pilon",
            description: "Hamburguesa Super gigantesca con carne. huevo y tocineta. La especialidad de la casa",
            picture: "https://live.staticflickr.com/11/13948280_21fe44bb14_b.jpg",
            price: 1500
        })





    }

  }catch(error){
    console.log(error)
  }

  
}

module.exports = {
  initialize
};