import ProductoDaosFactory from './../daos/productoDaoFactory.js';
import ProductoDto from './../dto/Producto.dto.js';
import Producto from './../Producto.model.js';

export default class ProdutoRepository {
      constructor() {
            this.dao = ProductoDaosFactory.getProductDao();
      }
      async create(producto) {
            const productDto = await this.dao.postItem(
                  new ProductoDto(producto)
            );
            return new Producto(productDto);
      }

      async get(query) {
            const productsDto = await this.dao.getAll(query);

            return productsDto.map((productDto) => new Producto(productDto));
      }
      async getById(id) {
            const productDto = await this.dao.getById(id);
            return new Producto(productDto);
      }
      async upDate(id, dato) {
            const data = await this.dao.putItem(id, dato);
            return data;
      }
      async deleteProduct(id) {
            const data = await this.dao.deleteItem(id);
            return data;
      }
}
