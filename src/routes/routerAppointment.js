const {Router} = require('express');
const postAppointment = require('../controllers/appointment/postAppointment');
const getAppointmentsByUser = require('../controllers/appointment/getAppointmentsByUser');
const getAppointmentsByDoctor = require('../controllers/appointment/getAppointmentsByDoctor')

const routerAppointment = Router();
routerAppointment.post('/', postAppointment);
routerAppointment.get("/byUser/:userId", getAppointmentsByUser);
routerAppointment.get("/byDoctor/:doctorId", getAppointmentsByDoctor)

module.exports = routerAppointment;