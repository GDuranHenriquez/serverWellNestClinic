const { Router } = require("express");

const { getDoctorById } = require("../controllers/Doctors/getDoctorById");
const { getDoctors } = require("../controllers/Doctors/getDoctors");
const { postDoctors } = require("../controllers/Doctors/postDoctors");
const { postDoctorSpeciality } = require("../controllers/Doctors/postDoctorSpeciality");

const routerDoctor = Router();
routerDoctor.get("/getDoctor/:id", getDoctorById);
routerDoctor.get("/doctors", getDoctors);
routerDoctor.post("/postDoctor", postDoctors);
routerDoctor.post("/doctorSpeciality", postDoctorSpeciality);

module.exports = routerDoctor;