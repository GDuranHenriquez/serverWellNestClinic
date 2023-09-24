const { Router } = require('express');
const { getDataUserClient } = require('../controllers/usersClient/getDataUserClient');


const routerDataUserClient = Router();
routerDataUserClient.get('/', getDataUserClient);


module.exports = routerDataUserClient;