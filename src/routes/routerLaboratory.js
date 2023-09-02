const { Router } = require("express");

const postLaboratory = require("../controllers/laboratory/postLaboratory")

const laboratoryRouter = Router();
routerDoctor.post("/", postLaboratory);

module.exports = laboratoryRouter;