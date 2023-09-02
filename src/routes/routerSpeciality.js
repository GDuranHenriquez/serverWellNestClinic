const { Router } = require("express");

const {getSpecialities} = require("../controllers/speciality/getSpecialities");
const {postSpeciality} = require("../controllers/speciality/postSpeciality");

const routerSpeciality = Router();
routerSpeciality.get("/", getSpecialities);
routerSpeciality.post("/", postSpeciality);

module.exports = routerSpeciality;