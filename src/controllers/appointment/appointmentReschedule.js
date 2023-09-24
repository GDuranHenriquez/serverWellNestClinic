const {Appointment, StatusAppointment, Doctor} = require('../../db');
const { splitStrinToIntTime, createArraySchedule, splitIntToStrinTime, validateDisponivilidad, validateDisponivilidadUser } = require('../../utils/splitIntHoraToStrin');


async function appointmentReschedule(req, res){
  try {
    const {id, doctor, userClient, date, startTime} = req.body;

    if(!doctor, !userClient, !date, !startTime || !id) {
      return res.status(401).json({error: 'Mandatory data is missing'});
    };

    const status = await StatusAppointment.findOne({where: {status: 'open'}});
    const getAppointmentDoctor = await Appointment.findAll({where: { 
      doctor: doctor, date: date
     } });
    const getAppointmentUser = await Appointment.findAll({where: { 
      userClient: userClient, date: date
     } });
    
     if(status === null){
      return res.status(403).json({error: 'Open status is not registered'})
     };
    
    if(!getAppointmentDoctor.length){
      if(getAppointmentUser.length === 1){
        const appointment = await Appointment.update({
          doctor, date, startTime
        }, {
          where: {
            id: id
          }});
        if(appointment){
          const appointment = await Appointment.findByPk(id, {
            attributes: ['id', 'date', 'startTime'],
            include: [
                {model: Doctor, as: "Appointment_Doctor"},
                {model: StatusAppointment, as: 'Status_Appointment'}
            ]});
          return res.status(200).json(appointment) 
        }else{
          return res.status(403).json({error: "Appointment could not be rescheduled"})
        }
      }else if(getAppointmentUser.length > 1){
        const busySchedulesByUser = createArraySchedule(getAppointmentUser);
        const createReSchedules = validateDisponivilidadUser(busySchedulesByUser, startTime);
        if(createReSchedules[0]){
          const appointment = await Appointment.update({
            doctor, date, startTime
            }, {
            where: {
              id: id
            }});
          if(appointment){
          const appointment = await Appointment.findByPk(id, {
            attributes: ['id', 'date', 'startTime'],
            include: [
                {model: Doctor, as: "Appointment_Doctor"},
                {model: StatusAppointment, as: 'Status_Appointment'}
            ]});
            return res.status(200).json(appointment) 
          }else{
            return res.status(403).json({error: 'Appointment could not be rescheduled'})
          }
        }else{
          return res.status(403).json(createReSchedules[1]);
        }
      } 

    }else{
      if(getAppointmentUser.length === 1){
        const busySchedules = createArraySchedule(getAppointmentDoctor);
        const isAvailability = validateDisponivilidad(busySchedules, startTime);
        if(isAvailability[0]){
          const appointment = await Appointment.update({
            doctor, date, startTime
            }, {
            where: {
              id: id
            }});
          if(appointment){
          const appointment = await Appointment.findByPk(id, {
            attributes: ['id', 'date', 'startTime'],
            include: [
                {model: Doctor, as: "Appointment_Doctor"},
                {model: StatusAppointment, as: 'Status_Appointment'}
            ]});
            return res.status(200).json(appointment) 
          }else{
            return res.status(403).json({error: 'Appointment could not be rescheduled'})
          }
        }else{
          return res.status(403).json(isAvailability[1]);
        };
      }else if(getAppointmentUser.length > 1){
        const busySchedulesByUser = createArraySchedule(getAppointmentUser);
        const busySchedulesDoctor = createArraySchedule(getAppointmentDoctor);
        const createReSchedulesUser = validateDisponivilidadUser(busySchedulesByUser, startTime);

        if(createReSchedulesUser[0]){
          const isAvailability = validateDisponivilidad(busySchedulesDoctor, startTime);
          if(isAvailability[0]){
            const appointment = await Appointment.update({
              doctor, date, startTime
              }, {
              where: {
                id: id
              }});
            if(appointment){
            const appointment = await Appointment.findByPk(id, {
              attributes: ['id', 'date', 'startTime'],
              include: [
                  {model: Doctor, as: "Appointment_Doctor"},
                  {model: StatusAppointment, as: 'Status_Appointment'}
              ]});
              return res.status(200).json(appointment) 
            }else{
              return res.status(403).json({error: 'Appointment could not be rescheduled'})
            }
          }else{
            return res.status(403).json(isAvailability[1]);
          }          
        }else{
          return res.status(403).json(createReSchedulesUser[1]);
        }
      }
    }
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {appointmentReschedule};