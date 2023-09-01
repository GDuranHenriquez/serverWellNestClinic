const { Router } = require("express");

const { getSaleByUser } = require("../controllers/sale/getSale.js");
const routerSaleByUser = Router();
routerSaleByUser.get("/:userId", getSaleByUser);

module.exports = routerSaleByUser;