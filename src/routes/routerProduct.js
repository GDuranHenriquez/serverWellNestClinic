const { Router } = require("express");

const { getProducts } = require("../controllers/product/getProducts");
const { deleteProduct } = require("../controllers/product/deleteProduct");
const { postProduct } = require("../controllers/product/postProduct");
const getProductById = require("../controllers/product/getProductById")

const productRouter = Router();
productRouter.get("/", getProducts);
productRouter.get("/:productId", getProductById);
productRouter.post("/", postProduct);
productRouter.delete("/:productId", deleteProduct);

module.exports = productRouter;