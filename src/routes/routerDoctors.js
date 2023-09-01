const { Router } = require("express");

const { getDoctorById } = require("../controllers/Doctors/getDoctorById");
const { getDoctors } = require("../controllers/Doctors/getDoctors");
const { postDoctors } = require("../controllers/Doctors/postDoctors");
const { postDoctorSpeciality } = require("../controllers/Doctors/postDoctorSpeciality");

const routerDoctor = Router();
routerDoctor.get("/:id", getDoctorById);
routerDoctor.get("/", getDoctors);
routerDoctor.post("/", postDoctors);
routerDoctor.post("/Speciality", postDoctorSpeciality);

module.exports = routerDoctor;