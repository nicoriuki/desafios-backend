import CarritosModelModel from '../../model/mensajes.js';
import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';

class MensajesDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(CarritosModelModel);
      }
}
export default MensajesDaosMongoDb;
