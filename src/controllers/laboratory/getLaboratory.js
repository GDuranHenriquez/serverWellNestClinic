const { Laboratory } = require("../../db")
const getLaboratory = async (req, res) => {
    try {
        const labs = await Laboratory.findAll();
        return res.status(200).json(labs);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
module.exports = getLaboratory;