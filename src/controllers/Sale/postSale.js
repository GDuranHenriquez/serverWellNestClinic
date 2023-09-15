const Stripe = require("stripe");
const {Sale, Cart, Product, DetailSale} = require('../../db');
require('dotenv').config();
const {SKSTRIPE} = process.env
const stripe = new Stripe(SKSTRIPE);

const postSale = async (req, res) => {
    try {
        const {stripeId, price, cartId, user, discount} = req.body;
        if(!stripeId || !price || !cartId || !user) {
            return res.status(403).json({error: 'Mandatory data is missing'})
        }
        const cart = await Cart.findOne({where: {id: cartId}, include: [{model: Product}]})
        if(!cart){
            return res.status(404).json({error: 'Cart not found'})
        }
        if(cart.user !== user) {
            return res.status(401).json({error: "The user doesn't seem to be the owner of this cart"})
        }
        const date = new Date()
        const saleData = {stripeId, price, date, user}
        if(discount){
            saleData.discount = discount
        }
        const sale = await Sale.create(saleData)
        const detailData = cart.products.map((product) => ({
            amount: product.cart_product.amount,
            price: product.price,
            sale: sale.id,
            product: product.id
        }))
        const detailSale = await DetailSale.bulkCreate(detailData)
        // const PayM = await stripe.paymentIntents.create({
            //     amount,
            //     payment_method: id,
            //     confirm: true
            // })
        await cart.destroy()

        // Logica para manejar el envio de correo al usuario con la info de la compra

        return res.status(200).json({ message: "Successful Payment", sale });
    } catch (error) {
        const message = error.raw ? error.raw.message : error.message
        return res.status(500).json({ message });
    }
}

module.exports = {postSale};