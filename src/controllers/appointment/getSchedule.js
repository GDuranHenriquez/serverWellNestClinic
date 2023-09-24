const {Appointment, StatusAppointment, UserClient} = require('../../db');
const { validateDoctorClientSchedule, createArraySchedule, validateAvailabilityHours, 
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
      return res.status(403).json({error: 'Open status is not registered'})
    };
    if(client === null){
      return res.status(403).json({error: 'This client is not registered'})
    };
    
    //return res.status(200).json({userClient: userClient, date: date});
    const getAppointmentDoctor = await Appointment.findAll({
      where: { 
        doctor: parseInt(doctor), 
        date: date
      } 
    });
     
     const getAppointmentUserClient = await Appointment.findAll({where: { 
      userClient: userClient, date: date
     } }); 
     
    
    if(!getAppointmentDoctor.length && !getAppointmentUserClient.length){      
      const schedule = [800, 830, 900, 930, 1000, 1030, 1100, 1130, 1300, 1330, 1400, 1430, 1500, 1530, 1600];
      const scheduleString = createArrayScheduleString(schedule);

      return res.status(200).json({ scheduleString: scheduleString, scheduleInt: schedule });

    }else if(!getAppointmentDoctor.length){
      const busySchedulesUserClient = createArraySchedule(getAppointmentUserClient);
      const SchedulesClient = validateAvailabilityHours(busySchedulesUserClient);
      return res.status(200).json(SchedulesClient);

    }else if(!getAppointmentUserClient.length){
      const busySchedulesDoctor = createArraySchedule(getAppointmentDoctor);
      const SchedulesDoctor = validateAvailabilityHours(busySchedulesDoctor);
      return res.status(200).json(SchedulesDoctor);
       
    }else{      
      const busySchedulesDoctor = createArraySchedule(getAppointmentDoctor);
      const busySchedulesUserClient = createArraySchedule(getAppointmentUserClient);
      const SchedulesDoctor = validateAvailabilityHours(busySchedulesDoctor);
      const SchedulesClient = validateAvailabilityHours(busySchedulesUserClient);
      const SchedulesAvailability = validateDoctorClientSchedule(SchedulesDoctor, SchedulesClient);
      return res.status(200).json(SchedulesAvailability);          
    };
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = { postSchedule };