const {Router} = require('express');
const postAppointment = require('../controllers/appointment/postAppointment');
const getAppointmentsByUser = require('../controllers/appointment/getAppointmentsByUser');
const getAppointmentsByDoctor = require('../controllers/appointment/getAppointmentsByDoctor');
const { appointmentReschedule } = require('../controllers/appointment/appointmentReschedule');

const routerAppointment = Router();
routerAppointment.post('/', postAppointment);
routerAppointment.post('/appointment-reschedule', appointmentReschedule);
routerAppointment.get("/byUser/", getAppointmentsByUser);
routerAppointment.get("/byDoctor/", getAppointmentsByDoctor)

module.exports = routerAppointment;