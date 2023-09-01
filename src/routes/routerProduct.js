const { Router } = require("express");

const { getProducts } = require("../controllers/product/getProducts");
const { deleteProduct } = require("../controllers/product/deleteProduct");
const { postProduct } = require("../controllers/product/postProduct");

const productRouter = Router();
productRouter.get("/", getProducts);
productRouter.post("/", postProduct);
productRouter.delete("/", deleteProduct);

module.exports = productRouter;