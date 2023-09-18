const {Cart, Product, UserClient, Plan} = require('../../db')

const getCart = async (req, res) => {
    try {
        const {user} = req.params

        if(!user){
            return res.status(403).json({error: "Mandatory data is missing"})
        }

        const userPlan = await UserClient.findByPk(user, {
            include: [{
                model: Plan,
                as: "UserClient_Plan"
            }],
        });
        if(!userPlan) {
            return res.status(404).json({error: "User plan not found"});
        }

        const cart = await Cart.findOne({where: {user},
            attributes:['id'],
            include: [
                {
                    model: Product,
                    attributes: ['id','name', 'price'],
                    through: {
                        attributes: ['amount'],
                    },
                },
            ]
        })

        if(!cart){
            return res.status(404).json({error: "Cart not found"})
        }

        let totalPrice = 0;
        for(const product of cart.products) {
            totalPrice += (product.price * product.cart_product.amount)
        }

        const discount = userPlan.UserClient_Plan.discount;
        const discountedPrice = calculateDiscountedPrice(totalPrice, discount);
        cart.discountedPrice = discountedPrice;

        return res.status(200).json({cart, discountedPrice})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

function calculateDiscountedPrice(price, discount) {
    const discountedPrice = price * (1- discount);
    return discountedPrice;
}

module.exports = getCart