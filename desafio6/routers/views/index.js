const { Router } = require("express");
const home = require("./home");



const router = Router();
router.use("/", home);



module.exports = router;
