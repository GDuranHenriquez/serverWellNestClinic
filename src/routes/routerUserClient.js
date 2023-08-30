const { Router } = require('express');
const { postUserClient } = require('../controllers/usersClient/postUserClient');
const { getUserClient } = require('../controllers/usersClient/getUserClient');

const clientUserRouter = Router();
clientUserRouter.post('/', postUserClient);
clientUserRouter.get('/', getUserClient);

module.exports = clientUserRouter;