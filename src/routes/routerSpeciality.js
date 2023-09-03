const { Router } = require("express");

const {getSpecialities} = require("../controllers/Speciality/getSpecialities");
const {postSpeciality} = require("../controllers/Speciality/postSpeciality");

const routerSpeciality = Router();
routerSpeciality.get("/", getSpecialities);
routerSpeciality.post("/", postSpeciality);

module.exports = routerSpeciality;