const { Router } = require("express");

const {postLaboratory} = require("../controllers/laboratory/postLaboratory")

const laboratoryRouter = Router();

laboratoryRouter.post("/", postLaboratory);

module.exports = laboratoryRouter;