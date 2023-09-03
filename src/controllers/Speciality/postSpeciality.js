const { Speciality } = require("../../db");

const postSpeciality = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name) {
            return res.status(403).json({error: "Mandatory data is missing"});
        }
        const [speciality, created] = await Speciality.findOrCreate({where: {name: name.toLowerCase()}});
        if(created) {
            return res.status(200).json(speciality);
        } else {
            return res.status(403).json({error: `Speciality name: ${name}, already exist`})
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {postSpeciality};