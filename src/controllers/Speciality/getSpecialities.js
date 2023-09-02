const { Speciality } = require("../../db");

const getSpecialities = async (req, res) => {
    try {
        const specialities = Speciality.findAll();
        return res.status(200).json(specialities);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {getSpecialities};