const { Laboratory } = require("../../db");

const postLaboratory = async (req, res) => {
try {
    const { name } = req.body;
    if(!name) {
        return res.status(403).json({error: "Some data is missing"});
    }
        const laboratory = await Laboratory.create({name});

    return res.status(200).json(laboratory);
} catch (error) {
    return res.status(500).send({error: error.message});
    }
};

module.exports = {postLaboratory};