const { Router } = require("express");

const {postLaboratory} = require("../controllers/laboratory/postLaboratory")
const getLabratory = require("../controllers/laboratory/getLaboratory")

const laboratoryRouter = Router();

laboratoryRouter.post("/", postLaboratory);
laboratoryRouter.get("/", getLabratory)

module.exports = laboratoryRouter;