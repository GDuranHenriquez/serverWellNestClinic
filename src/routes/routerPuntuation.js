const { Router } = require("express");

const {postPuntuation} = require("../controllers/Puntuation/postPuntuation");

const puntuationRouter = Router();

puntuationRouter.post('/', postPuntuation);

module.exports = puntuationRouter;