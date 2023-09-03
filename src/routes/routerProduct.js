const { Router } = require("express");

const { getProducts } = require("../controllers/product/getProducts");
const { deleteProduct } = require("../controllers/product/deleteProduct");
const { postProduct } = require("../controllers/product/postProduct");
const getProductById = require("../controllers/product/getProductById")
const getProductByName = require("../controllers/product/getProductByName")

const productRouter = Router();
productRouter.get("/", getProducts);
productRouter.get("/:productId", getProductById);
productRouter.get("/name/:productName", getProductByName);
productRouter.post("/", postProduct);
productRouter.delete("/:productId", deleteProduct);

module.exports = productRouter;