const express = require('express');
const router = express.Router();
const ControllerRegister = require('../controller/controllerRegister');
const ControllerLogin = require('../controller/controllerLogin');
const productsRouter = require('./routerProducts');


router.get("/", (req, res) => res.redirect("/products"))
router.post("/register", ControllerRegister.postRegister)
router.post("/login", ControllerLogin.postLogin)
router.use("/products", productsRouter)


module.exports = router