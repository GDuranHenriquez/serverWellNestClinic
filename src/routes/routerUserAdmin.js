const { Router } = require('express');
const { postLoginUserAdmin } = require('../controllers/AdminUser/loginAdmin');
const { posRegisterAcountUserAdmin } = require('../controllers/AdminUser/postRegisterAdmin');


const routerAdminUser = Router();

routerAdminUser.post('/register', posRegisterAcountUserAdmin);
routerAdminUser.post('/login', postLoginUserAdmin);


module.exports = routerAdminUser;