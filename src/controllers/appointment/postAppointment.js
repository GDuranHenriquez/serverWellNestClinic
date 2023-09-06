const {Appointment} = require('../../db');

async function postAppointment(req, res){
  try {
    const {doctor, userClient, date, startTime, endTime} = req.body;

    if(!doctor, !userClient, !date, !startTime) {
      return res.status(401).json({error: 'Mandatory data is missing'})
    }

    const getAppointmentDoctor = await Appointment.findAll({where: { 
      doctor: doctor
     } });

     
     if(!getAppointmentDoctor.length){
      const [appointment, created] = await Appointment.findOrCreate({where: {date, startTime, doctor}, defaults:{endTime}});
      if(created) {
        appointment.setAppointment_UserClient(userClient)
          return res.status(200).json(appointment)
      } else {
          return res.status(403).json({error: 'On that time the doctor already have a scheduled appointment'})
      }
     }else{
      let  busySchedules = [];
      getAppointmentDoctor.forEach(element => {
        let start = element.dataValues.startTime;
        start = start.split(':');
        start = `${start[0]}` + `${start[1]}`
        busySchedules.push(Number(start));
      });
      console.log(busySchedules.sort((a, b) => a -b));
      return res.status(200).json(busySchedules);
     } 

    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = postAppointment;