const { Drug } = require("../../db")
const getDrugs = async (req, res) => {
    try {
        const drugs = await Drug.findAll();
        return res.status(200).json(drugs);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
module.exports = { getDrugs };