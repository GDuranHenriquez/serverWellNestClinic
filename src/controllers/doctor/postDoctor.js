const { Doctor, Speciality } = require("../../db");
const { Op } = require("sequelize");

const postDoctor = async (req, res) => {
try {
    const { name, lastName, phone, email, speciality, address } = req.body;
    if(!name || !lastName || !phone || !email || !address || !speciality.length) {
        return res.status(403).json({error: "Mandatory data is missing"});
    }
    const specialitiesIds = speciality.map((sp) => parseInt(sp))
    const findedSpecialities = await Speciality.findAll({where: {id: {[Op.in]: specialitiesIds}}})

    if(Object.keys(findedSpecialities).length === 0) {
        return res.status(403).json({error: "The required specialities do not exist"})
    }
    
    const [doctor, created] = await Doctor.findOrCreate({where:{email}, defaults: {name, lastName,phone, address }});
    if(created){
        doctor.addSpeciality(findedSpecialities);
        const response = {
            id: doctor.id,
            name: doctor.name,
            lastName: doctor.lastName,
            phone: doctor.phone,
            email: doctor.email,
            address: doctor.address,
            speciality: findedSpecialities
        }
        return res.status(200).json(response);
    }
    return res.status(403).json({error: `Doctor's Email: ${email}, allready exist in data base`})
    
} catch (error) {
    return res.status(500).send({error: error.message});
}
};

module.exports = { postDoctor };
