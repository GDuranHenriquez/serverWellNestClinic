const { DetailSale, Product } = require("../../db")



const getDetailSale = async (req, res) => {
     
    try {

        const {saleId} = req.params
        const detailSales = await DetailSale.findAll({where: {DetailSale_Sale: saleId}, includes : [{model: Product , attributes:['name']}]});
        return res.stauts(200).json(detailSales);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
module.exports = {getDetailSale};

