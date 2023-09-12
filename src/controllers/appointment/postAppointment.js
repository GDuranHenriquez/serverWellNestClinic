const {Appointment, StatusAppointment, UserClient} = require('../../db');
const { splitStrinToIntTime, createArraySchedule, splitIntToStrinTime, validateDisponivilidad } = require('../../utils/splitIntHoraToStrin');


async function postAppointment(req, res){
  try {
    const {doctor, userClient, date, startTime, speciality} = req.body;

    if(!doctor, !userClient, !date, !startTime, !speciality) {
      return res.status(401).json({error: 'Mandatory data is missing'});
    };
    const status = await StatusAppointment.findOne({where: {status: 'open'}});
    const client = await UserClient.findOne({where: {id: userClient}});
    if(status === null){
      return res.status(403).json({error: 'Open status is not registered'})
    };
    if(client === null){
      return res.status(403).json({error: 'This client is not registered'})
    };

    
    const getAppointmentDoctor = await Appointment.findAll({where: { 
      doctor: doctor
     } });
    
     
    
    if(!getAppointmentDoctor.length){
      const [appointment, created] = await Appointment.findOrCreate({where: {date, startTime, doctor, speciality}});

      if(created) {
        appointment.setAppointment_UserClient(userClient);
        appointment.setStatus_Appointment(status.dataValues.id);
        return res.status(200).json(appointment)
      } else {
          return res.status(403).json({error: 'At that time the doctor already has a appointment scheduled'})
      }

    }else{
      
      const busySchedules = createArraySchedule(getAppointmentDoctor);
      const isAvailability = validateDisponivilidad(busySchedules, startTime);
      if(isAvailability[0]){
        const createAppointment = await Appointment.create({date:date, startTime: startTime, doctor: doctor, speciality});
        createAppointment.setAppointment_UserClient(userClient);
        createAppointment.setStatus_Appointment(status.dataValues.id);
        return res.status(200).json(createAppointment);
      }else{
        return res.status(200).json(isAvailability);
      };     
    };
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = postAppointment;