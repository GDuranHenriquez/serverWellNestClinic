const { Doctor } = require("../../db");

const postDoctor = async (req, res) => {
try {
    const { name, lastName, phone, email, speciality, address } = req.body;
    if(!name || !lastName || !phone || !email || !address) {
        return res.status(403).json({error: "Some data is missing"});
    }
        const doctor = await Doctor.create({name, lastName, email, phone, speciality, address});
        doctor.addSpeciality(speciality);

    return res.status(200).json(doctor);
} catch (error) {
    return res.status(404).send({error: error.message});
    }
};

module.exports = { postDoctors };