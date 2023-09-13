const { DetailSale, Product } = require("../../db")

const postDSalebyUser = async (req, res) => {
    try {
        const {id , amount, price } = req.body 
        const postSaleByUser = await DetailSale.findOrCreate( {id, amount, price })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

mmodule.exports = {postDSalebyUser}