const {Appointment, Doctor} = require('../../db');

const getAppointmentByUser = async (req, res) => {
    try {
        const {doctorId} = req.params;
        const appointments = await Appointment.findAll({
            where: {doctor: doctorId},
            attributes: ['id', 'date', 'startTime', 'endTime']
        })
        return res.status(200).json(appointments)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getAppointmentByUser