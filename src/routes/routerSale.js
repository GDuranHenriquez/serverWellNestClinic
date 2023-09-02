const { Router } = require("express");

const { getSaleByUser } = require('../controllers/Sale/getSale');
const routerSaleByUser = Router();
routerSaleByUser.get("/:userId", getSaleByUser);

module.exports = routerSaleByUser;