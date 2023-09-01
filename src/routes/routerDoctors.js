const { Router } = require("express");

const { getDoctorById } = require("../controllers/Doctors/getDoctorById");
const { getDoctors } = require("../controllers/Doctors/getDoctors");
const { postDoctors } = require("../controllers/Doctors/postDoctors");

const routerDoctor = Router();
routerDoctor.get("/:id", getDoctorById);
routerDoctor.get("/", getDoctors);
routerDoctor.post("/", postDoctors);

module.exports = routerDoctor;