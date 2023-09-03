const { Speciality } = require("../../db");

const getSpecialities = async (req, res) => {
    try {
        const specialities = await Speciality.findAll();
        if(!Object.keys(specialities).length) {
            return res.status(404).json({error: 'There is no Speciality loaded yet'})
        }
        return res.status(200).json(specialities);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {getSpecialities};