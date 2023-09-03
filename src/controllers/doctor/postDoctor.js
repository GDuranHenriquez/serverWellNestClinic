const { Doctor, Speciality } = require("../../db");
const { Op } = require("sequelize");
const { all } = require("../../routes/routerDoctor");

const postDoctor = async (req, res) => {
try {
    const { name, lastName, phone, email, speciality, address } = req.body;
    if(!name || !lastName || !phone || !email || !address || !speciality) {
        return res.status(403).json({error: "Mandatory data is missing"});
    }
    const findSpeciality = speciality.map((sp) => parseInt(sp))
    const especialidad = await Speciality.findAll({where: {id: {[Op.in]: findSpeciality}}})

    if(Object.keys(especialidad).length === 0) {
        return res.status(403).json({error: "No existen las especialidades requeridas"})
    }

    // if(Object.keys(allSpeciality).length === findSpeciality.length) {
    //     return res.status(403).json({error: "Algunas de las especialidades requeridas no existen"})
    // }
    console.log((especialidad))
    
    const doctor = await Doctor.create({name, lastName, email, phone, address});
          doctor.addSpeciality(especialidad);

    return res.status(200).json({...doctor, especialidad});
} catch (error) {
    return res.status(404).send({error: error.message});
    }
};

module.exports = { postDoctor };

// const postActivity = async (req, res) => {
//     const { name, difficulty, season, countries } = req.body
//     try {
//         if (!name || !difficulty || !season || !countries) throw Error("Faltan datos")
//         const respuesta = await Activity.create({ name, difficulty, season });
//         await respuesta.setCountries(countries);
//         const actividadCreada = await Activity.findOne({
//             where: { id: respuesta.id }, include: {
//                 model: Country, through: {
//                     attribute: [],
//                 },
//             }
//         });

//         return res.status(200).json({ message: "Actividad creada correctamente", actividadCreada });
//     } catch (error) {
//         return res.status(404).send({ error: error.message });
//     }
// }