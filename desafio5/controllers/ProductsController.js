const BD = require("../db/index");

class ProductsController {
      /* Funcion para crear productos */
      static postProduct(data) {
            try {
                  const result = BD.postProduct(data);
                  const product = BD.getProId(result.insertedId);
                  return product;
            } catch (error) {
                  throw error;
            }
      }

      /* funcion para obtener todos los productos */
      static getProduct(query) {
            try {
                  const products = BD.getProduct();

                  return products;
            } catch (error) {
                  throw error;
            }
      }
      /* funcion para obtener producto por id*/
      static async getProId(id) {
            try {
                  console.log("params.id", id);
                  return products[0];
            } catch (error) {
                  throw error;
            }
      }
}

module.exports = ProductsController;
