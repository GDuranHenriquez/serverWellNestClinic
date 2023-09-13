const Stripe = require("stripe");

const stripe = new Stripe("sk_test_51NphDtGBKVf0lzYsxR6mjnviE4PPMgmbnQEdjQr6T7jWnKcIfYy7ZLvVk9gZZ07iJgTR86XFiS8hmLev8zJ4tcVF00Gx0Kjln4");


const postPayMethod = async (req, res) => {
    const {id, amount} = req.body;


    try {
        const PayM = await stripe.paymentIntents.create({
            
            amount,
            payment_method: id,
            confirm: true
        })

        return res.status(200).json({ message: "Successful Payment" });
    } catch (error) {
        return res.status(500).json({ message: error.raw.message });
    }



}

module.exports = {postPayMethod}