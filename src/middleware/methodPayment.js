const { getModel } = require("../database")


const foundMethodPayment = async (req,resp,next)=>{

    const PaymentMethod= getModel("PaymentMethod");
    let paymentFound = await PaymentMethod.findOne({
        where:{
            id: req.params.id
        }
    })

    if (paymentFound === null)
        resp.status(404).json({"Message": "No se encuentra el metodo de pago"})
    else
        next()

}

const foundMethodPaymentOrder = async (req,resp,next)=>{

    const PaymentMethod= getModel("PaymentMethod");
    let paymentFound = await PaymentMethod.findOne({
        where:{
            id: req.body.paymentMethodId
        }
    })

    if (paymentFound === null)
        resp.status(404).json({"Message": "No se encuentra el metodo de pago"})
    else
        next()

}


module.exports= {
    foundMethodPayment,
    foundMethodPaymentOrder
}