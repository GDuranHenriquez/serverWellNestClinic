const { Router } = require("express");

const {postScore} = require("../controllers/score/postScore");

const routerScore = Router();

routerScore.post('/', postScore);

module.exports = routerScore;