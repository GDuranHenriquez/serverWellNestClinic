const { Router } = require('express');
const { postStatusAppointment } = require('../controllers/StatusAppointment/postStatusAppointment');
const { getStatusAppointment } = require('../controllers/StatusAppointment/getStatusAppointment');


const routerAppointmentRouter = Router();
routerAppointmentRouter.post('/', postStatusAppointment);
routerAppointmentRouter.get('/', getStatusAppointment);

module.exports = routerAppointmentRouter;