const { Router } = require("express");

const { getSaleByUser } = require('../controllers/Sale/getSale');
const {postSale} = require('../controllers/sale/postSale')

const routerSaleByUser = Router();
routerSaleByUser.get("/:user", getSaleByUser);
routerSaleByUser.post('/', postSale)

module.exports = routerSaleByUser;