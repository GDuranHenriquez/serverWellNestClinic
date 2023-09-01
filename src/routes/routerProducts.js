const { Router } = require("express");

const { getProducts } = require("../controllers/Products/getProducts");
const { deleteProduct } = require("../controllers/Products/deleteProduct");
const { postProduct } = require("../controllers/Products/postProduct");

const productRouter = Router();
productRouter.get("/farmacy", getProducts);
productRouter.post("/postProducts", postProduct);
productRouter.delete("/deleteProducts", deleteProduct);

module.exports = productRouter;