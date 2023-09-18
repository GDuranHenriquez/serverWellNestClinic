const { Cart, Product, Plan, UserClient } = require("../../db");

const postCart = async (req, res) => {
  try {

    const { user, productId, amount } = req.body;

    if ((!user, !productId, !Number(amount) < 0)) {
      return res.status(403).json({ error: "Mandatory data is missing" });
    }

    const response = await Cart.findOrCreate({ where: { user } });
    
    if (Number(amount) === 0) {
      await Cart.destroy({
        where: {
            user: user,
            productId: productId
        }
      });
    } else {
      await response[0].addProduct(productId, { through: { amount } });
    }

    const userPlan = await UserClient.findByPk(user, {
      include: [
        {
          model: Plan,
          as: "UserClient_Plan",
        },
      ],
    });

    if (!userPlan) {
      return res.status(404).json({ error: "User plan not found" });
    }

    const cart = await Cart.findOne({
      where: { user },
      attributes: ["id"],
      include: [
        {
          model: Product,
          attributes: ["name", "price"],
          through: {
            attributes: ["amount"],
          },
        },
      ],
    });

    let totalPrice = 0;

    for (const product of cart.products) {
      totalPrice += product.price * product.cart_product.amount;
    }

    const discount = userPlan.UserClient_Plan.discount;
    const discountedPrice = calculateDiscountedPrice(totalPrice, discount);
    cart.discountedPrice = discountedPrice;
    return res.status(200).json({ cart, discountedPrice });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function calculateDiscountedPrice(price, discount) {
  const discountedPrice = price * (1 - discount);
  return discountedPrice;
}

module.exports = { postCart };
