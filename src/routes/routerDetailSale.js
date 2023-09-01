const { Router } = require("express");

const { getDetailSale } = require("../controllers/DetailSale/getDetailSale.js");
const routerDetail = Router();
routerDetail.get("/", getDetailSale);

module.exports = routerDetail;