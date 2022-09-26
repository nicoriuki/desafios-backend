const { Router } = require("express");
const ProductsController = require("../../controllers/ProductsController");

const router = Router();

router.post("/", (req, res, next) => {
      console.log("holaa");
      try {
            const product = ProductsController.postProduct(req.body);
            const data = {
                  detailUrlBase: `${process.env.BASE_HOST}`,
            };
            res.render("form", data);
      } catch (error) {
            next(error);
      }
});

module.exports = router;
