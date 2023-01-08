import productsService from '../services/products.service.js';

class ProductController {
      constructor() {}
      async getAllProducts() {
            return productsService.getAllProducts();
      }

      async postProduct(data) {
            await productsService.postProduct(data);
            const productos = await productsService.getProductos;
            return productos;
      }

      async deleteProduct(id) {
            await productsService.deleteProduct(id);
            const productos = await productsService.getProductos;
            return productos;
      }
      async getProductosById(id) {
            const producto = await productsService.getProductosById(id);
            return producto;
      }
      async putProduct(id, data) {
            await productsService.putProduct(id, data);
            const productos = await productsService.getProductos;
            return productos;
      }
}
export default new ProductController();
