const { Router } = require("express");

const {postCart} = require("../controllers/Cart/postCart");
const getCart = require('../controllers/Cart/getCart')

const routerCart = Router();
routerCart.post('/', postCart);
routerCart.get('/:user', getCart)

module.exports = routerCart;