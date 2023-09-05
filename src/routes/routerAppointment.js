const {Router} = require('express');
const postAppointment = require('../controllers/appointment/postAppointment');

const routerAppointment = Router();
routerAppointment.post('/', postAppointment);

module.exports = routerAppointment;