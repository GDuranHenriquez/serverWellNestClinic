const Stripe = require("stripe");
const {Sale, Cart, Product, DetailSale, UserClient, Plan} = require('../../db');
require('dotenv').config();
const {SKSTRIPE} = process.env
const stripe = new Stripe(SKSTRIPE);
const { sendBillPharmacyToUser } = require('../../utils/nodemailer');

const postSale = async (req, res) => {
    try {
        const {stripeId, cartId, user} = req.body;
        if(!stripeId || !cartId || !user) {
            return res.status(403).json({error: 'Mandatory data is missing'})
        }
        const cart = await Cart.findOne({where: {id: cartId}, include: [{model: Product}]})
        if(!cart){
            return res.status(404).json({error: 'Cart not found'})
        }
        if(cart.user !== user) {
            return res.status(401).json({error: "The user doesn't seem to be the owner of this cart"})
        }
        const userClient = await UserClient.findOne({where: {id: user}, attributes: [], include: [{model: Plan, as: "UserClient_Plan"}]})
        let discount = 0.5 // ==> se obtiene del plan
        const date = new Date()
        const saleData = {stripeId, date, user}
        let priceTot = 0
        let promises = []
        for(const product of cart.products){
            if(product.stock < product.cart_product.amount){
                return res.status(403).json({error: `The requested product: ${product.name} ${product.dose} is not available. Please discard or select another product` })
            }
            promises.push(Product.update({stock: (product.stock - product.cart_product.amount)}, {where: {id: product.id}}))
            priceTot += (product.price * product.cart_product.amount)
        }
        await Promise.all(promises)
        if(discount){
            saleData.discount = discount
        }
        saleData.price = discount ? (priceTot * (1 - discount)) : priceTot
        const payment = await stripe.paymentIntents.create({
            amount: priceTot,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        })

        const sale = await Sale.create(saleData)
        const detailData = cart.products.map((product) => ({
            amount: product.cart_product.amount,
            price: product.price,
            sale: sale.id,
            product: product.id
        }))
        const detailSale = await DetailSale.bulkCreate(detailData)
        await cart.destroy()

        // Logica para manejar el envio de correo al usuario con la info de la compra
        sendBillPharmacyToUser(UserClient.name, UserClient.emailRegister, cart_product.amount, cart_product.price, sale.id, cart_product.product )

        return res.status(200).json({ message: "Successful Payment", sale, cart });
    } catch (error) {
        const message = error.raw ? error.raw.message : error.message
        return res.status(500).json({ message });
    }
}

module.exports = {postSale};