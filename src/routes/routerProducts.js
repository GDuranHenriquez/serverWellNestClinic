const { Router } = require("express");

const { getProducts } = require("../controllers/Products/getProducts");
const { deleteProduct } = require("../controllers/Products/deleteProduct");
const { postProduct } = require("../controllers/Products/postProduct");

const productRouter = Router();
productRouter.get("/", getProducts);
productRouter.post("/", postProduct);
productRouter.delete("/", deleteProduct);

module.exports = productRouter;