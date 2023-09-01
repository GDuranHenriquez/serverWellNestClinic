const { Drug } = require("../../db");

const postDrug = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name) {
            return res.status(403).json({error: "Drug name is missing"});
        }
        const drug = await Drug.create({name});
        return res.status(200).json(drug);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {postDrug};