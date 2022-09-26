const { Router } = require("express");
const ProductsController = require("../../controllers/ProductsController");

const router = Router();

router.get("/", (req, res, next) => {
      try {
            const products = ProductsController.getProduct(req.query);
            res.json(products);
      } catch (error) {
            next(error);
      }
});

router.get("/:id", (req, res, next) => {
      try {
            const product = ProductsController.getProId(req.params.id);
            res.json(product);
      } catch (error) {
            next(error);
      }
});

module.exports = router;
