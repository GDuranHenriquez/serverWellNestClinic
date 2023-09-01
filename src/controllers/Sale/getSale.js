const { Sale } = require("../../db")


const getSaleByUser = async (req, res) => {

    try {
        const SalesbyUser = await Sale.findAll();
        return res.stauts(200).json(SalesbyUser);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
module.exports = {getSaleByUser};