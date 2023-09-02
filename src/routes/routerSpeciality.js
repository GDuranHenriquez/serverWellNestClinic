const { Router } = require("express");

const {getSpeciality} = require("../controllers/Speciality/getSpecialities");
const {postSpeciality} = require("../controllers/Speciality/postSpeciality");

const routerSpeciality = Router();
routerSpeciality.get("/", getSpeciality);
routerSpeciality.post("/", postSpeciality);

module.exports = routerSpeciality;