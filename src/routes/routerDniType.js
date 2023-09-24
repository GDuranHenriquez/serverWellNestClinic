const { Router } = require("express");

const {getDniType} = require("../controllers/DniType/getDniType");
const {postDniType} = require("../controllers/DniType/postDniType");

const routerDniType = Router();
routerDniType.get("/", getDniType);
routerDniType.post("/", postDniType);

module.exports = routerDniType;