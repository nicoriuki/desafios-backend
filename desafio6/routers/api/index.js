const { Router } = require("express");
const postProduct = require("./postProduct");
const getProduct = require("./getProduct");

const router = Router();

router.use("/productos", postProduct, getProduct);

module.exports = router;
