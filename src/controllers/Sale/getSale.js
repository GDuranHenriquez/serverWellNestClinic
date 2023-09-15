const { Sale, DetailSale, Product } = require("../../db")


const getSaleByUser = async (req, res) => {

    try {
        const {user} = req.params
        const sales = await Sale.findAll({where: {user}, include: [{model: DetailSale, as: "Sale_DetailSale", attributes: ["amount", "price"], include: [{model: Product, as: "DetailSale_Product", attributes: ["name", "dose", "imageUrl"]}]}]});
        if(!sales.length){
            return res.status(404).json({error: "There isn't any sale yet"})
        }
        return res.status(200).json(sales);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
module.exports = {getSaleByUser};