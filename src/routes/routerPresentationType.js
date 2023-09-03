const { Router } = require("express");

const postPresentationType = require('../controllers/presentationType/postPresentationType')

const routerPresentationType = Router();
routerPresentationType.post("/", postPresentationType);

module.exports = routerPresentationType;