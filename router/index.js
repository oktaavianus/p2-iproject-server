const express = require('express');
const router = express.Router();
const productsRouter = require('./routerProducts');
const ControllerLogin = require('../controller/controllerLogin');
const ControllerRegister = require('../controller/controllerRegister');
const ControllerCategory = require('../controller/controllerCategory');

router.get("/", (req, res) => res.redirect("/products"))
router.post("/register", ControllerLogin)
router.post("/login", ControllerRegister)
router.use("/category", ControllerCategory) //! belum ada router untuk category
// TODO untuk ke router di bawa akan kena authentication dsni
router.use("/products", productsRouter)
router.use("/cart",)


module.exports = router