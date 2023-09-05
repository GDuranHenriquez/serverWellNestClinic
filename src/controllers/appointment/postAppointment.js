const {Appointment} = require('../../db');

async function postAppointment(req, res){
  try {
    const {doctor, userClient, date, startTime, endTime} = req.body;
    if(!doctor, !userClient, !date) {
      return res.status(401).json({error: 'Mandatory data is missing'})
    }
    const [appointment, created] = await Appointment.findOrCreate({where: {date, startTime, doctor}, defaults:{endTime}});
    if(created) {
      appointment.setAppointment_UserClient(userClient)
        return res.status(200).json(appointment)
    } else {
        return res.status(403).json({error: 'On that time the doctor already have a scheduled appointment'})
    }
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = postAppointment;