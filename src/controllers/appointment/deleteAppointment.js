const {Appointment, StatusAppointment} = require('../../db')

const deleteAppointment = async (req, res) => {
    try {
        const {appointmentId} = req.params
        const appointment = await Appointment.findOne({where: {id: appointmentId}, include: [{model: StatusAppointment, as: "Status_Appointment"}]})
        if(appointment.Status_Appointment.status !== 'cancel'){
            const status = await StatusAppointment.findOne({where: {status: 'cancel'}})
            if(!status) {
                return res.status(404).json({error: 'Cancel status not registered'})
            }
            appointment.setStatus_Appointment(status.id);
            return res.status(200).json({message: 'Appointment successfully  canceled'})
        }
        return res.status(403).json({error: 'Appointment already canceled'})
        

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = deleteAppointment;