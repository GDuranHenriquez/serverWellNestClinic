const { Router } = require("express");
const {postDrug} = require("../controllers/Drug/postDrug");
const { getDrugs } = require("../controllers/Drug/getDrugs");

const drugRouter = Router();
drugRouter.post("/", postDrug);
drugRouter.get("/", getDrugs)


module.exports = drugRouter