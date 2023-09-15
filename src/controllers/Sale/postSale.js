const Stripe = require("stripe");
const {Sale, Cart, Product, DetailSale, UserClient, Plan} = require('../../db');
require('dotenv').config();
const {SKSTRIPE} = process.env
const stripe = new Stripe(SKSTRIPE);

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
        for(const product of cart.products){
            priceTot += product.price
        }
        if(discount){
            saleData.discount = discount
        }
        saleData.price = discount ? (priceTot * (1 - discount)) : priceTot
        // const payment = await stripe.paymentIntents.create({
            //     priceTot,
            //     payment_method: stripeId,
            //     confirm: true
            // })

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

        return res.status(200).json({ message: "Successful Payment", sale });
    } catch (error) {
        const message = error.raw ? error.raw.message : error.message
        return res.status(500).json({ message });
    }
}

module.exports = {postSale};