const { Router } = require("express");

const { getDoctorById } = require("../controllers/doctor/getDoctorById");
const { getDoctors } = require("../controllers/doctor/getDoctors");
const { postDoctor } = require("../controllers/doctor/postDoctor");

const routerDoctor = Router();
routerDoctor.get("/:id", getDoctorById);
routerDoctor.post("/", postDoctor);
routerDoctor.get("/", getDoctors);

module.exports = routerDoctor;