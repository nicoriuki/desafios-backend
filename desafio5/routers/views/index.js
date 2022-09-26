const { Router } = require("express");
const form = require("./form");
const getProduct = require("./getProduct");

const router = Router();
router.use("/", form);
router.use("/productos", getProduct);

module.exports = router;
