const {Appointment, Doctor} = require('../../db');

const getAppointmentByUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const appointments = await Appointment.findAll({
            where: {userClient: userId},
            attributes: ['id', 'date', 'startTime', 'endTime'],
            include: [{model: Doctor, as: "Appointment_Doctor"}]
        })
        if(!appointments.length) {
            return res.status(404).json({error: "You don't have any appointment scheduled yet"})
        } else {
            return res.status(200).json(appointments)
        }
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getAppointmentByUser