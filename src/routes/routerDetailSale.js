const { Router } = require("express");

const { getDetailSale } = require("../controllers/detailSale/getDetailSale.js");
const routerDetail = Router();
routerDetail.get("/:saleId", getDetailSale);

module.exports = routerDetail;