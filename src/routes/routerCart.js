const { Router } = require("express");

const {postCart} = require("../controllers/Cart/postCart");

const routerCart = Router();
routerCart.post('/', postCart);

module.exports = routerCart;