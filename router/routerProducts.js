const express = require("express");
const productsRouter = express.Router();
const ControllerProduct = require('../controller/controllerProduct');

productsRouter.get("/", ControllerProduct)
productsRouter.get("/:ProductId", ControllerProduct)
productsRouter.post("/:ProductId", ControllerProduct)
productsRouter.put("/:ProductId", ControllerProduct)
productsRouter.patch("/:ProductId", ControllerProduct) //! untuk admin menonatifkan product
productsRouter.delete("/:ProductId", ControllerProduct)


module.exports = productsRouter

