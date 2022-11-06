import { Server } from 'socket.io';
import {
      createTableProduct,
      createTableMessage,
      insert,
      get,
      update,
      delet,
      getById,
} from './controllers/DbController.js';
import { Mensaje } from './daos/index.js';

import util from 'util';
import { Normalizador } from './controllers/NormalizerController.js';

/* se define la varible io*/
let io;
/* se cargan 2 productos par aque la tabla no este vacia*/

/* function print(object) {
      console.log(util.inspect(object, false, 14, true));
}
const originalSize = JSON.stringify(pruebaData).length;
console.log(
      '--------------------------------------------------------------------'
);

console.log('Data Original', originalSize);

print(pruebaData);

console.log(
      '--------------------------------------------------------------------'
);

const normalizedSize = JSON.stringify(dataNormalized).length;
console.log('Data Normalized', normalizedSize);

print(dataNormalized);

console.log(
      '--------------------------------------------------------------------'
);
const resultSata = (normalizedSize * 100) / originalSize;

console.log('Porcentage de compresion:', resultSata.toFixed(2), '%'); */
try {
      /*    await createTableMessage(); */
      await createTableProduct();
} catch (error) {
      console.error(error.message);
}
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
            /* await Mensaje.getAll().then((data) => {
             */
            const dataMensajes = await Mensaje.getAll();
            const mensajes = await Normalizador(dataMensajes);
            io.emit('history-message', mensajes);
            /*  }); */

            /*  lee los productos de la Base de datos*/
            await get('productos', 'mysql').then((data) => {
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
                  /* await insert(data, 'message', 'sqlite'); */

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

                  await insert(data, 'productos', 'mysql');

                  /* y se emite*/
                  io.emit('notification-product', data);
            });
            socketClient.on('delete-product', async (data) => {
                  /* se borrar el producto en la Base de Datos*/

                  await delet({ id: data }, 'productos', 'mysql');
                  /* se vuelven enviar los productos */
                  await get('productos', 'mysql').then((data) => {
                        io.emit('history-products', data);
                  });
            });
            /* se piden un producto por la id */
            socketClient.on('getId-product', async (data) => {
                  let productId = [];

                  productId = await getById('productos', 'mysql', data);
                  /* se envia todos los datos del producto por id*/
                  io.emit('one-product', productId);
            });
            /* se edita el producto en la Base de Datos*/
            socketClient.on('edit-product', async (data) => {
                  await update(
                        {
                              nombre: data.nombre,
                              precio: data.precio,
                              imagen: data.imagen,
                              codigo: data.codigo,
                              stock: data.stock,
                        },
                        { id: data.id },
                        'productos',
                        'mysql'
                  );
                  /* se vuelven enviar los productos */
                  await get('productos', 'mysql').then((data) => {
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
