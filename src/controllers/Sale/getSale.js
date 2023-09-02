const { Sale } = require("../../db")


const getSaleByUser = async (req, res) => {

    try {
        const {userId} = req.params
        const salesbyUser = await Sale.findAll({where: {Sale_UserClient: userId}});
        return res.status(200).json(salesbyUser);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
module.exports = {getSaleByUser};