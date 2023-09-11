const {Appointment, StatusAppointment, UserClient} = require('../../db');
const { splitStrinToIntTime, createArraySchedule, validateAvailabilityHours, 
  validateDisponivilidad, createArrayScheduleString } = require('../../utils/splitIntHoraToStrin');


async function postSchedule(req, res){
  try {
    const {doctor, userClient, date} = req.body;

    if(!doctor, !userClient, !date) {
      return res.status(401).json({error: 'Mandatory data is missing'});
    };
    const status = await StatusAppointment.findOne({where: {status: 'open'}});
    const client = await UserClient.findOne({where: {id: userClient}});

    if(status === null){
      return res.status(403).json({error: 'open status is not registered'})
    };
    if(client === null){
      return res.status(403).json({error: 'This client is not registered'})
    };
    
    const getAppointmentDoctor = await Appointment.findAll({where: { 
      doctor: doctor, date: date
     } });

     const getAppointmentUserClient = await Appointment.findAll({where: { 
      userClient: userClient
     } }); 
     
    
    if(!getAppointmentDoctor.length){      
      const schedule = [800, 830, 900, 930, 1000, 1030, 1100, 1130, 1300, 1330, 1400, 1430, 1500, 1530, 1600];
      const scheduleString = createArrayScheduleString(schedule);

      return res.status(200).json({ scheduleString: scheduleString, scheduleInt: schedule });

    }else{      
      const busySchedulesDoctor = createArraySchedule(getAppointmentDoctor);
      const busySchedulesUserClient = createArraySchedule(getAppointmentUserClient);
      const SchedulesDoctor = validateAvailabilityHours(busySchedulesDoctor);

      return res.status(200).json(SchedulesDoctor);          
    };
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = { postSchedule };