const { Cart, Product } = require('../../db');

const postCart = async (req, res) => {
    try {
        const { user, productId, amount } = req.body;
        if(!user, !productId, !amount){
            return res.status(403).json({error: "Mandatory data is missing"})
        }
        const cart = await Cart.findOrCreate({where: {user}})
        await cart.addProduct(productId, {through: {amount}});
        const response = await Cart.findOne({
            where: { id: cart.id },
            attributes:['id'],
            include: [
                {
                    model: Product,
                    attributes: ['name', 'price'],
                    through: {
                        attributes: ['amount'],
                    },
                },
            ],
        });
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {postCart};