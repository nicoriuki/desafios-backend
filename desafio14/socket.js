import { Server } from 'socket.io';
import { Mensaje, Producto } from './daos/index.js';
import { Normalizador } from './controllers/NormalizerController.js';

/* se define la varible io*/
let io;

/* funcion para iniciar el socket.io*/
function initSocket(httpServer) {
      io = new Server(httpServer);
      setEvents(io);
}
/* funcion para los eventos de  el socket.io*/
async function setEvents(io) {
      /* conencion del cliente*/
      io.on('connect', async (socketClient) => {
            /*  lee los mensajes de la Base de datos*/

            const dataMensajes = await Mensaje.getAll();
            const mensajes = await Normalizador(dataMensajes);
            io.emit('history-message', mensajes);

            /*  lee los productos de la Base de datos*/
            await Producto.getAll().then((data) => {
                  io.emit('history-products', data);
            });

            console.log(
                  'Se conecto un nuevo cliente con el id',
                  socketClient.id
            );
            /* se recibe nuevo mensaje*/
            socketClient.on('new-message', async (data) => {
                  /* se guarda el mensaje*/

                  await Mensaje.postItem(data);

                  /* y se emite al cliente*/

                  io.emit('history-message', mensajes);
                  io.emit('notification-message', data);
            });
            /* se recibe el mail del cliente que escribe*/
            socketClient.on('new-isWriting', (data) => {
                  /* se emite el mail del cliente que escribe*/
                  io.emit('IsWriting', data);
            });

            /* se recibe un nuevo producto*/
            socketClient.on('new-product', async (data) => {
                  /* se guarda el producto en la Base de Datos*/
                  await Producto.postItem(data);

                  /* y se emite*/
                  await Producto.getAll().then((data) => {
                        io.emit('history-products', data);
                  });
            });
            socketClient.on('delete-product', async (data) => {
                  /* se borrar el producto en la Base de Datos*/
                  await Producto.deleteItem(data);

                  /* se vuelven enviar los productos */
                  await Producto.getAll().then((data) => {
                        io.emit('history-products', data);
                  });
            });
            /* se piden un producto por la id */
            socketClient.on('getId-product', async (data) => {
                  let productId = [];
                  productId = await Producto.getById(data);

                  /* se envia todos los datos del producto por id*/
                  io.emit('one-product', productId);
            });
            /* se edita el producto en la Base de Datos*/
            socketClient.on('edit-product', async (data) => {
                  await Producto.putItem(data.id, data);

                  /* se vuelven enviar los productos */
                  await Producto.getAll().then((data) => {
                        io.emit('history-products', data);
                  });
            });

            /* se avisa si se desconecto el cliente*/
            socketClient.on('disconnect', () => {
                  console.log(
                        'Se desconecto el cliente con el id',
                        socketClient.id
                  );
            });
      });
}
/*funcion para emitir*/
function emit(event, data) {
      io.emit(event, data);
}

export { initSocket, emit };
