const { Router } = require("express");

const { getSaleByUser } = require("../controllers/sale/getSale.js");
const routerSaleByUser = Router();
routerSaleByUser.get("/saleByUser", getSaleByUser);

module.exports = routerSaleByUser;