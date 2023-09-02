const { Router } = require("express");

const { getDetailSale } = require("../controllers/DetailSale/getDetailSale");
const routerDetail = Router();
routerDetail.get("/:saleId", getDetailSale);

module.exports = routerDetail;