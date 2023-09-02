const { Router } = require("express");
const {postDrug} = require("../controllers/drug/postDrug");

const drugRouter = Router();
drugRouter.post("/", postDrug);

module.exports = drugRouter