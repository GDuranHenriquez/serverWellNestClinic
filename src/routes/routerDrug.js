const { Router } = require("express");
const {postDrug} = require("../controllers/Drug/postDrug");

const drugRouter = Router();
drugRouter.post("/", postDrug);

module.exports = drugRouter