const { Laboratory } = require("../../db");

const postLaboratory = async (req, res) => {
try {
    const { name } = req.body;
    if(!name) {
        return res.status(403).json({error: "Mandatory data is missing"});
    }
    const [laboratory, created] = await Laboratory.findOrCreate({where: {name: name.toLowerCase()}});
    if(created) {
        return res.status(200).json(laboratory);
    } else {
        return res.status(403).json({error: `Laboratory name: ${name}, already exist`})
    }    
} catch (error) {
    return res.status(500).send({error: error.message});
    }
};

module.exports = {postLaboratory};