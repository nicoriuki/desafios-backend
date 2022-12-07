import UsuairosModel from '../../model/user.js';
import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';

class UsuariosDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(UsuairosModel);
      }
}
export default UsuariosDaosMongoDb;
