const { Router } = require("express");

const { getDetailSale } = require("../controllers/detailSale/getDetailSale.js");
const routerDetail = Router();
routerDetail.get("/", getDetailSale);

module.exports = routerDetail;