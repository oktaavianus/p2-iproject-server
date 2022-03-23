const express = require("express");
const cartRouter = express.Router();
const ControllerCart = require('../controller/controllerCart');
const { authentication, authorization, authorizationAdmin } = require('../middleware/auth');

cartRouter.get("/", authentication, ControllerCart.getCartByUserId)
cartRouter.post("/:ProductId", authentication, ControllerCart.postCart)
cartRouter.delete("/:ProductId", authentication, authorization, ControllerCart.deleteProductFromCart)

module.exports = cartRouter