const { Drug } = require("../../db");

const postDrug = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name) {
            return res.status(403).json({error: "Drug name is missing"});
        }
        const [drug, created] = await Drug.findOrCreate({where: {name: name.toLowerCase()}});
        if(created) {
            return res.status(200).json(drug);
        } else {
            return res.status(403).json({error: `Drug name: ${name}, already exist`})
        }
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {postDrug};