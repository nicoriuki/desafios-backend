import { Mensaje } from '../daos/index.js';

class MessageService {
      constructor() {}

      async getAllMessages() {
            return await Mensaje.getAll();
      }

      async PostMessage(dato) {
            await Mensaje.postItem(dato);
            return dato;
      }
}
export default new MessageService();
