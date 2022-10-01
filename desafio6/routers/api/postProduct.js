const { Router } = require("express");
const ProductsController = require("../../controllers/ProductsController");

const router = Router();

router.post("/", (req, res, next) => {
      try {
            const product = ProductsController.postProduct(req.body);
            const data = {
                  detailUrlBase: `${process.env.BASE_HOST}`,
            };
            res.render("home", data);
      } catch (error) {
            next(error);
      }
});

module.exports = router;
