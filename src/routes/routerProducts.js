const { Router } = require("express");

const { getProducts } = require("../../PF/PF/serverWellNestClinic/src/controllers/Products/getProducts");
const { deleteProduct } = require("../../PF/PF/serverWellNestClinic/src/controllers/Products/deleteProduct");
const { postProduct } = require("../../PF/PF/serverWellNestClinic/src/controllers/Products/postProduct");

const productRouter = Router();
productRouter.get("/farmacy", getProducts);
productRouter.post("/postProducts", postProduct);
productRouter.delete("/deleteProducts", deleteProduct);

module.exports = productRouter;