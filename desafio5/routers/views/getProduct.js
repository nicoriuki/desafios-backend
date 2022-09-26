const { Router } = require("express");
const ProductsController = require("../../controllers/ProductsController");

const router = Router();

router.get("/", (req, res, next) => {
      try {
            const products = ProductsController.getProduct();
            const data = {
                  products,
                  isEmpty: !products.length,
                  detailUrlBase: process.env.BASE_HOST,
            };
            res.render("products", data);
      } catch (error) {
            next(error);
      }
});
/*ruta para getProduct  producto por id */
router.get("/:id", async (req, res) => {
      try {
            const product = await ProductsController.getProId(req.params);
            console.log(product.title);
            res.render("product", product);
      } catch (error) {
            next(error);
      }
});
module.exports = router;
