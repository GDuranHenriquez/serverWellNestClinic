const { Speciality } = require("../../db");

const postDoctorSpeciality = async (req, res) => {
    try {
        const { id, name } = req.body;
        if(!name || !id) {
            return res.status(403).json({error: "Some data is missing"});
        }
        const speciality = Speciality.create({id, name})
        return res.status(200).json(speciality);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = postDoctorSpeciality;