const { Doctor, Speciality, Location } = require("../../db")

const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params
        const doctor = await Doctor.findOne({where: {id}, 
            include: [
                {model: Speciality, through: {attributes: []}}
            ]});

        if(doctor) {
            return res.status(200).json(doctor);
        } else {
            return res.status(404).json({ message: "Doctor not found" });
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = { getDoctorById };