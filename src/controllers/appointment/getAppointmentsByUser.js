const {Appointment, Doctor, UserClient ,StatusAppointment, Speciality} = require('../../db');

const getAppointmentsByUser = async (req, res) => {
    try {
        const {userId, statusId} = req.query;
        const where = {}
        if(userId){
            where.userClient = userId
        }
        if(statusId){
            where.StatusAppointmentId = statusId
        }

        const appointments = await Appointment.findAll({
            where,
            attributes: ['id', 'date', 'startTime'],
            include: [
                {model: Doctor, as: "Appointment_Doctor", 
                attributes: ['id', 'name', 'lastName']},
                {model: StatusAppointment, as: 'Status_Appointment'},
                {model: UserClient, as: 'Appointment_UserClient',
                attributes: ['id', 'name', 'lastName', 'email', 'backupContact', 'imageUrl']},
                {model: Speciality, as: 'Appointment_Speciality'}]
        });
        if(!appointments.length) {
            return res.status(200).json({error: "You don't have any appointment scheduled yet" + (statusId ? " with the specified status" : "")})
        } else {
            return res.status(200).json(appointments)
        }
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getAppointmentsByUser