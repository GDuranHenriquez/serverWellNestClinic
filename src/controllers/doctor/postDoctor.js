const { Doctor, Speciality } = require("../../db");
const { Op } = require("sequelize");

const postDoctor = async (req, res) => {
try {
    const { name, lastName, phone, email, specialities, address } = req.body;

    if(!name || !lastName || !phone || !email || !address || !specialities.length) {
        return res.status(403).json({error: "Mandatory data is missing"});
    };

    const specialitiesIds = [];
    specialities.forEach((element) => {
        if(parseInt(element)){
            specialitiesIds.push(parseInt(element));
        }else{
            return res.status(403).json({
                error: "request not valid",
                message: `The speciality id: ${element} is invalid, the id must be an integer`
            })
        };
    });
    
    const findedSpecialities = await Speciality.findAll({where: {id: {[Op.in]: specialitiesIds}}})
    
    if(Object.keys(findedSpecialities).length === 0) {
        return res.status(403).json({error: "request not valid",  message: "The required specialities don't exist"})
    }
    
    if(specialities.length !== findedSpecialities.length){
        return res.status(403).json({
            error: "request not valid",
            message: `At least one of the provided specialties is not registered. The registered ones are attached below, please check and proceed with the corresponding actions to register them`,
            data: findedSpecialities
        })
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
            specialities: findedSpecialities
        }
        return res.status(200).json(response);
    }
    return res.status(403).json({error: `Doctor's Email: ${email}, is already registered`})
    
} catch (error) {
    return res.status(500).send({error: error.message});
}
};

module.exports = { postDoctor };
