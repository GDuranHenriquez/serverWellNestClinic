const { Router } = require('express');
const { deleteSingOut } = require('../controllers/signOut/singOut');

const routerSingOut = Router();

routerSingOut.delete('/', deleteSingOut);

module.exports = routerSingOut;