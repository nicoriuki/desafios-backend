import ProductosModelModel from '../../model/productos.js';
import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';

class ProductosDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(ProductosModelModel);
      }
}
export default ProductosDaosMongoDb;
