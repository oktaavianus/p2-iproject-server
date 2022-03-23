const express = require("express");
const productsRouter = express.Router();
const ControllerProduct = require('../controller/controllerProduct');
const { authentication, authorization, authorizationAdmin } = require('../middleware/auth');

productsRouter.get("/", ControllerProduct.getAllProducts)
productsRouter.post("/", authentication, ControllerProduct.postProducts)
productsRouter.get("/:ProductId", ControllerProduct.getProductById)
productsRouter.put("/:ProductId", authentication, authorization,ControllerProduct.putProductById)
productsRouter.patch("/:ProductId", authentication, authorizationAdmin, ControllerProduct.patchProduct) //! hanya Admin yg bisa PATCH status
productsRouter.delete("/:ProductId", authentication, authorization, ControllerProduct.deleteProductById)


module.exports = productsRouter

