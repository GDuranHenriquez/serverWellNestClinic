const { Router } = require("express");

const {getSpeciality} = require("../controllers/Speciality/getSpeciality");

const routerSpeciality = Router();
routerSpeciality.get("/", getSpeciality);

module.exports = routerSpeciality;