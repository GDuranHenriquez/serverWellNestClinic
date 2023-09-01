const { DetailSale } = require("../../db")


const getDetailSale = async (req, res) => {

    try {
        const DetailSales = await DetailSale.findAll();
        return res.stauts(200).json(DetailSales);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
module.exports = {getDetailSale};