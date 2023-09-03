const { Router } = require("express");

const { getSaleByUser } = require("../controllers/sale/getSale");
const routerSaleByUser = Router();
routerSaleByUser.get("/:userId", getSaleByUser);

module.exports = routerSaleByUser;