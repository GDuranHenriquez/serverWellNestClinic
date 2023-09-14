const {Router} = require('express');
const postAppointment = require('../controllers/appointment/postAppointment');
const getAppointmentsByUser = require('../controllers/appointment/getAppointmentsByUser');
const getAppointmentsByDoctor = require('../controllers/appointment/getAppointmentsByDoctor');
const { appointmentReschedule } = require('../controllers/appointment/appointmentReschedule');
const { postSchedule } = require('../controllers/appointment/getSchedule');
const deleteAppointment = require('../controllers/appointment/deleteAppointment')

const routerAppointment = Router();

routerAppointment.post("/doctor-schedule", postSchedule);
routerAppointment.post('/appointment-reschedule', appointmentReschedule);
routerAppointment.post('/', postAppointment);
routerAppointment.get("/byUser/", getAppointmentsByUser);
routerAppointment.get("/byDoctor/", getAppointmentsByDoctor);
routerAppointment.delete("/:appointmentId", deleteAppointment)

module.exports = routerAppointment;