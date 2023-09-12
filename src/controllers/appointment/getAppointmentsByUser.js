const {Appointment, Doctor, StatusAppointment, Speciality} = require('../../db');

const getAppointmentsByUser = async (req, res) => {
    try {
        const {userId, statusId} = req.query;

        if(statusId){
            const appointments = await Appointment.findAll({
                where: {userClient: userId, StatusAppointmentId: statusId},
                attributes: ['id', 'date', 'startTime'],
                include: [
                    {
                        model: Doctor,
                        as: "Appointment_Doctor",
                        attributes: ['id', 'name', 'lastName'],
                        include: [
                            {
                                model: Speciality,
                                attributes: ['name'],
                            }
                        ]
                    },
                    {model: StatusAppointment, as: 'Status_Appointment'}]
            });
            if(!appointments.length) {
                return res.status(200).json({error: "You don't have any appointment scheduled yet"})
            } else {
                return res.status(200).json(appointments)
            }
        }else{
            const appointments = await Appointment.findAll({
                where: {userClient: userId},
                attributes: ['id', 'date', 'startTime'],
                include: [
                    {
                        model: Doctor,
                        as: "Appointment_Doctor",
                        attributes: ['id', 'name', 'lastName'],
                        include: [
                            {
                                model: Speciality,
                                attributes: ['name'],
                            }
                        ]
                    },
                    {model: StatusAppointment, as: 'Status_Appointment'}]      
            });
            if(!appointments.length) {
                return res.status(200).json({error: "You don't have any appointment scheduled yet"})
            } else {
                return res.status(200).json(appointments)
            }
        };
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getAppointmentsByUser