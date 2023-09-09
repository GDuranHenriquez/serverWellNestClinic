const { Router } = require('express');
const { posRegisterAcountUser } = require('../controllers/usersClient/postRegisterAcountUser');
const { getValidateUsername } = require('../controllers/usersClient/getValidateUserName');
const { postLoginUserClient } = require('../controllers/usersClient/postLoginUserClient');
const { getIsMember } = require('../controllers/usersClient/getIsMember');

const loginRegister = Router();
loginRegister.post('/register', posRegisterAcountUser);
loginRegister.get('/validateUser', getValidateUsername);
loginRegister.post('/login', postLoginUserClient);
loginRegister.get('/isMember/:ID', getIsMember);

module.exports = loginRegister;