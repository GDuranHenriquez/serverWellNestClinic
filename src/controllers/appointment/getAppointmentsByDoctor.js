const {
  Appointment,
  Doctor,
  StatusAppointment,
  UserClient,
  Speciality,
} = require("../../db");

const getAppointmentsByUser = async (req, res) => {
  try {
    const { doctorId, statusId } = req.query;
    if (statusId && doctorId) {
      const appointments = await Appointment.findAll({
        where: { doctor: doctorId, StatusAppointmentId: statusId },
        attributes: ["id", "date", "startTime"],
        include: [
          {
            model: Doctor,
            as: "Appointment_Doctor",
            attributes: ["id", "name", "lastName"],
          },
          { model: StatusAppointment, as: "Status_Appointment" },
          {
            model: UserClient,
            as: "Appointment_UserClient",
            attributes: [
              "id",
              "name",
              "lastName",
              "email",
              "backupContact",
              "imageUrl",
            ],
          },
          { model: Speciality, as: "Appointment_Speciality" },
        ],
      });
      if (!appointments.length) {
        return res
          .status(200)
          .json({ error: "You don't have any appointment scheduled yet" });
      } else {
        return res.status(200).json(appointments);
      }
    } else if (doctorId) {
      const appointments = await Appointment.findAll({
        where: { doctor: doctorId },
        attributes: ["id", "date", "startTime"],
        include: [
          {
            model: Doctor,
            as: "Appointment_Doctor",
            attributes: ["id", "name", "lastName"],
          },
          { model: StatusAppointment, as: "Status_Appointment" },
          {
            model: UserClient,
            as: "Appointment_UserClient",
            attributes: [
              "id",
              "name",
              "lastName",
              "email",
              "backupContact",
              "imageUrl",
            ],
          },
          { model: Speciality, as: "Appointment_Speciality" },
        ],
      });
      if (!appointments.length) {
        return res
          .status(200)
          .json({ error: "You don't have any appointment scheduled yet" });
      } else {
        return res.status(200).json(appointments);
      }
    } else {
      const appointments = await Appointment.findAll({
        attributes: ["id", "date", "startTime"],
        include: [
          {
            model: Doctor,
            as: "Appointment_Doctor",
            attributes: ["id", "name", "lastName"],
          },
          { model: StatusAppointment, as: "Status_Appointment" },
          {
            model: UserClient,
            as: "Appointment_UserClient",
            attributes: [
              "id",
              "name",
              "lastName",
              "email",
              "backupContact",
              "imageUrl",
            ],
          },
          { model: Speciality, as: "Appointment_Speciality" },
        ],
      });
      if (!appointments.length) {
        return res
          .status(200)
          .json({ error: "You don't have any appointment scheduled yet" });
      } else {
        return res.status(200).json(appointments);
      }
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAppointmentsByUser;
