const { DetailSale, Product } = require("../../db")



const getDetailSale = async (req, res) => {
     
    try {

        const {id} = req.params
        const DetailSales = await DetailSale.findAll({where: {DetailSale_Sale: id}, includes : [{model: Product , attributes:['name']}]});
        return res.stauts(200).json(DetailSales);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
module.exports = {getDetailSale};

