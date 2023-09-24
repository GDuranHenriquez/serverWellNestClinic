const { Router } = require("express");

const postPresentationType = require('../controllers/presentationType/postPresentationType')
const getPresentationType = require("../controllers/presentationType/getPresentationType")

const routerPresentationType = Router();
routerPresentationType.post("/", postPresentationType);
routerPresentationType.get("/", getPresentationType)

module.exports = routerPresentationType;