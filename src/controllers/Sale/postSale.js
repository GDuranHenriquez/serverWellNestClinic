const {
  Sale,
  Cart,
  Product,
  DetailSale,
  UserClient,
  Plan,
} = require("../../db");

require("dotenv").config();
const { SKSTRIPE_PRIVATE } = process.env;
const stripe = require("stripe")(SKSTRIPE_PRIVATE);

const postSale = async (req, res) => {
  try {
    const { stripeId, cartId, user } = req.body;

    if (!stripeId || !cartId || !user /* || !(Number(amount) > 0) */) {
      return res.status(403).json({ error: "Mandatory data is missing" });
    }
    const cart = await Cart.findOne({
      where: { id: cartId },
      include: [{ model: Product }],
    });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    if (cart.user !== user) {
      return res
        .status(401)
        .json({ error: "The user doesn't seem to be the owner of this cart" });
    }
    const userClient = await UserClient.findOne({
      where: { id: user },
      attributes: [],
      include: [{ model: Plan, as: "UserClient_Plan" }],
    });
    let discount = userClient.UserClient_Plan.discount;

    const date = new Date();
    date.setUTCHours(date.getUTCHours() - 3);
    const options = {
      timeZone: "America/Argentina/Buenos_Aires",
      hour12: false, // Formato de 24 horas
    };
    const formattedDate = date.toLocaleString("es-AR", options);
    const formattedDateParts = formattedDate.split(' ');
    const dateParts = formattedDateParts[0].split("/");
    const timeParts = formattedDateParts[1].split(":");
    const formattedDateForDB = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]} ${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`;

    const saleData = { stripeId, date: formattedDateForDB, user };
    let priceTot = 0;
    let promises = [];

    for (const product of cart.products) {
      if (product.stock < product.cart_product.amount) {
        return res
          .status(403)
          .json({
            error: `The requested product: ${product.name} ${product.dose} is not available. Please discard or select another product`,
          });
      }
      promises.push(
        Product.update(
          { stock: product.stock - product.cart_product.amount },
          { where: { id: product.id } }
        )
      );
      priceTot += product.price * product.cart_product.amount;
    }

    if (discount) {
      saleData.discount = discount;
    }
    saleData.price = discount ? priceTot * (1 - discount) : priceTot;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: saleData.price * 100,
      currency: "usd",
      description: "Charging for pharmacy products",
      payment_method: stripeId,
      confirm: true,
      return_url: "https://wellnest-clinic.netlify.app/",
    });

    await Promise.all(promises);

    const sale = await Sale.create(saleData);
    console.log(formattedDate);
    const detailData = cart.products.map((product) => ({
      amount: product.cart_product.amount,
      price: product.price,
      sale: sale.id,
      product: product.id,
    }));

    const detailSale = await DetailSale.bulkCreate(detailData);
    await cart.destroy();
    // Logica para manejar el envio de correo al usuario con la info de la compra
    
    /* sendBillPharmacyToUser(UserClient.name, UserClient.emailRegister, cart_product.amount, cart_product.price, sale.id, cart_product.product ) */

    return res.status(200).json({ message: "Successful Payment", sale, cart });
  } catch (error) {
    const message = error.raw ? error.raw.message : error.message;
    return res.status(500).json({ message });
  }
};

module.exports = { postSale };
