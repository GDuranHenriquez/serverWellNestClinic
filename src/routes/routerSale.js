const { Router } = require("express");

const { getSaleByUser } = require("../controllers/Sale/getSale.js");
const routerSaleByUser = Router();
routerSaleByUser.get("/SaleByUser", getSaleByUser);

module.exports = routerSaleByUser;