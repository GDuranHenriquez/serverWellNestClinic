const { Appointment, StatusAppointment, UserClient, Doctor, Speciality } = require("../../db");
const {
  varifyStartTimeInSchedule,
  createArraySchedule,
  validateAvailabilityHours,
  validateDoctorClientSchedule,
} = require("../../utils/splitIntHoraToStrin");
const { sendMailAppointment } = require('../../utils/nodemailer')

async function postAppointment(req, res) {
  try {
    const { doctor, userClient, date, startTime, speciality } = req.body;

    if ((!doctor, !userClient, !date, !startTime, !speciality)) {
      return res.status(401).json({ error: "Mandatory data is missing" });
    }

    const status = await StatusAppointment.findOne({
      where: { status: "open" },
    });
    const client = await UserClient.findOne({ where: { id: userClient } });

    if (status === null) {
      return res.status(403).json({ error: "Open status is not registered" });
    }
    if (client === null) {
      return res.status(403).json({ error: "This client is not registered" });
    }

    const getAppointmentDoctor = await Appointment.findAll({
      where: {
        doctor: doctor,
        date: date,
      }
    });

    const getAppointmentUserClient = await Appointment.findAll({
      where: {
        userClient: userClient,
        date: date,
      },
    });

    const doctorData = await Doctor.findByPk(doctor)
    const specialityData = await Speciality.findByPk(speciality)

    if (!getAppointmentDoctor.length && !getAppointmentUserClient.length) {
      const [appointment, created] = await Appointment.findOrCreate({
        where: { doctor, date, startTime, speciality },
      });

      if (created) {
        appointment.setAppointment_UserClient(userClient);
        appointment.setStatus_Appointment(status.dataValues.id);
        return res.status(200).json(appointment);
      } else {
        return res.status(403).json({
          error: "At that time the doctor already has a appointment scheduled",
        });
      }
    } else if (!getAppointmentDoctor.length) {
      
      const busySchedulesUserClient = createArraySchedule(
        getAppointmentUserClient
      );
      
      const SchedulesClient = validateAvailabilityHours(
        busySchedulesUserClient
      );
      
      const isAvailability = varifyStartTimeInSchedule(
        SchedulesClient.scheduleInt,
        startTime
      );
      
      if (!isAvailability) {        
        return res.status(401).json([
          false,
          {
            error: "no availability",
            message: "Schedule not available",
            available: SchedulesClient.scheduleString,
          }
        ]);
      }
      
      
      const createAppointment = await Appointment.create({
        date: date,
        startTime: startTime,
        doctor: doctor,
        speciality: speciality,
      });
      createAppointment.setAppointment_UserClient(userClient);
      createAppointment.setStatus_Appointment(status.dataValues.id);

      sendMailAppointment(client.name , client.lastName, client.email , doctorData.name , specialityData.name, date ) //nodemailer
      return res.status(200).json(createAppointment);

    } else if (!getAppointmentUserClient.length) {
      const busySchedulesDoctor = createArraySchedule(getAppointmentDoctor);
      const SchedulesDoctor = validateAvailabilityHours(busySchedulesDoctor);

      const isAvailability = varifyStartTimeInSchedule(
        SchedulesDoctor.scheduleInt,
        startTime
      );
      if (!isAvailability) {
        return res.status(401).json([
          false,
          {
            error: "no availability",
            message: "Schedule not available",
            available: SchedulesDoctor.scheduleString,
          }
        ]);
      }

      const createAppointment = await Appointment.create({
        date: date,
        startTime: startTime,
        doctor: doctor,
        speciality: speciality,
      });
      createAppointment.setAppointment_UserClient(userClient);
      createAppointment.setStatus_Appointment(status.dataValues.id);

      sendMailAppointment(client.name , client.lastName, client.email , doctorData.name , specialityData.name, date ) //nodemailer
      return res.status(200).json(createAppointment);
    } else {
      const busySchedulesDoctor = createArraySchedule(getAppointmentDoctor);
      const busySchedulesUserClient = createArraySchedule(
        getAppointmentUserClient
      );
      const SchedulesDoctor = validateAvailabilityHours(busySchedulesDoctor);
      const SchedulesClient = validateAvailabilityHours(
        busySchedulesUserClient
      );
      const SchedulesAvailability = validateDoctorClientSchedule(
        SchedulesDoctor,
        SchedulesClient
      );

      const isAvailability = varifyStartTimeInSchedule(
        SchedulesAvailability.scheduleInt,
        startTime
      );
      if (!isAvailability) {
        return res.status(401).json([
          false,'aqui',
          {
            error: "no availability",
            message: "Schedule not available",
            available: SchedulesAvailability.scheduleString,
          },
        ]);
      }

      const createAppointment = await Appointment.create({
        date: date,
        startTime: startTime,
        doctor: doctor,
        speciality: speciality,
      });
      createAppointment.setAppointment_UserClient(userClient);
      createAppointment.setStatus_Appointment(status.dataValues.id);

      sendMailAppointment(client.name , client.lastName, client.email , doctorData.name, doctorData.lastName, specialityData.name, date )  //nodemailer
      return res.status(200).json(createAppointment);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = postAppointment;
