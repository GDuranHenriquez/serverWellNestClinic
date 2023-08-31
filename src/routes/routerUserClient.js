const { Router } = require('express');
const { postUserClient } = require('../controllers/usersClient/postUserClient');
const { getUserClient } = require('../controllers/usersClient/getUserClient');
const { posRegisterAcountUser } = require('../controllers/usersClient/postRegisterAcountUser');
const { getValidateUsername } = require('../controllers/usersClient/getValidateUserName');
const { getLoginUserClient } = require('../controllers/usersClient/getLoginUserClient');
const { getIsMember } = require('../controllers/usersClient/getIsMember');

const clientUserRouter = Router();
clientUserRouter.post('/', postUserClient);
clientUserRouter.post('/register', posRegisterAcountUser);
clientUserRouter.get('/validateUser', getValidateUsername);
clientUserRouter.get('/login', getLoginUserClient);
clientUserRouter.get('/isMember/:ID', getIsMember);
clientUserRouter.get('/', getUserClient);

module.exports = clientUserRouter;