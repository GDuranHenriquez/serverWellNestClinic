const { Router } = require("express");

const {getSpeciality} = require("../controllers/speciality/getSpeciality");
const {postSpeciality} = require("../controllers/speciality/postSpeciality");

const routerSpeciality = Router();
routerSpeciality.get("/", getSpeciality);
routerSpeciality.post("/", postSpeciality);

module.exports = routerSpeciality;