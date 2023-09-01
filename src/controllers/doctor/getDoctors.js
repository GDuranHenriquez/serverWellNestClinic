const { Doctor, Speciality } = require("../../db");


const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll({include: {model: Speciality}});
        return res.status(200).json(doctors);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {getDoctors};