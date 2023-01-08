import { Producto } from '../daos/index.js';

class ProductoService {
      constructor() {}

      async getAllProducts() {
            return Producto.getAll();
      }

      async postProduct(data) {
            await Producto.postItem(data);
            return data;
      }

      async deleteProduct(id) {
            await Producto.deleteItem(id);
            return id;
      }
      async getProductosById(id) {
            const producto = await Producto.getById(id);
            return producto;
      }
      async putProduct(id, data) {
            await Producto.putItem(id, data);
      }
}
export default new ProductoService();
