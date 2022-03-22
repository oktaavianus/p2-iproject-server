const express = require('express');
const router = express.Router();
const ControllerRegister = require('../controller/controllerRegister');
const ControllerLogin = require('../controller/controllerLogin');

// router.get("/", (req, res) => res.redirect("/products"))
router.post("/register", ControllerRegister.postRegister)
router.post("/login", ControllerLogin.postLogin)


module.exports = router