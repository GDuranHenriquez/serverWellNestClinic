const {Cart, Product} = require('../../db')

const getCart = async (req, res) => {
    try {
        const {user} = req.params
        if(!user){
            return res.status(403).json({error: "Mandatory data is missing"})
        }
        const cart = await Cart.findOne({where: {user},
            attributes:['id'],
            include: [
                {
                    model: Product,
                    attributes: ['name', 'price'],
                    through: {
                        attributes: ['amount'],
                    },
                },
            ]
        })
        if(!cart){
            return res.status(404).json({error: "Cart not found"})
        }
        return res.status(200).json(cart)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getCart