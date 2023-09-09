const { Cart } = require('../../db');

const postCart = async (req, res) => {
    try {
        const { userId, productId, amount } = req.query;
        const [cart, created] = Cart.findOrCreate({where: {userId}});
        await cart.addCart_Product(productId, amount);
        if(created) {
            return res.status(200).json(cart)
        } else {
            res.status(200).json(created)
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {postCart};