const { Router } = require("express");
const {postDrug} = require("../controllers/Drug/postDrug");
const getDrugs = require("../controllers/drug/getDrugs")

const drugRouter = Router();
drugRouter.post("/", postDrug);
drugRouter.get("/", getDrugs)


module.exports = drugRouter