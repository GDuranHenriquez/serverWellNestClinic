const { Speciality } = require("../../db");

const postSpeciality = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name) {
            return res.status(400).json({
                error: "request not valid",
                message: "Mandatory data is missing"});
        };
        const [speciality, created] = await Speciality.findOrCreate({where: {name: name.toLowerCase()}});
        if(created) {
            return res.status(200).json(speciality);
        }else{
            return res.status(409).json({
                error: "request not valid",
                message: `Speciality name: ${name}, already exist`})
        }
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

module.exports = {postSpeciality};