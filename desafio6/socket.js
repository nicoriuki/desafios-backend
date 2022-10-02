const { Server } = require("socket.io");
const MessageController = require("./controllers/MessageController");

const handlerMessage = new MessageController("./mensajes.txt");
/* se define la varible io*/
let io;
/* se cargan 2 productos par aque la tabla no este vacia*/
let products = [
      {
            title: "Mouse",
            price: 532.21,
            thumbnail:
                  "https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/input-mouse-512.png",
      },
      {
            title: "Monitor",
            price: 1375.23,
            thumbnail:
                  "https://cdn2.iconfinder.com/data/icons/flat-set-2/64/flat_set_2-09-512.png",
      },
];
/* funcion para iniciar el socket.io*/
function initSocket(httpServer) {
      io = new Server(httpServer);
      setEvents(io);
}
/* funcion para los eventos de  el socket.io*/
async function setEvents(io) {
      /* conencion del cliente*/
      io.on("connect", (socketClient) => {
            /* funcion para leer los mensajes del archivo*/
            async function updateMessage() {
                  await handlerMessage.getAll().then((data) => {
                        socketClient.emit("history-message", data);
                  });
            }
            console.log(
                  "Se conecto un nuevo cliente con el id",
                  socketClient.id
            );
            updateMessage();
            /* se recibe nuevo mensaje*/
            socketClient.on("new-message", (data) => {
                  /* se guarda el mensaje*/
                  handlerMessage.save(data);
                  /* y se emite al cliente*/
                  io.emit("notification-message", data);
            });
            /* se recibe el mail del cliente que escribe*/
            socketClient.on("new-isWriting", (data) => {
                  /* se emite el mail del cliente que escribe*/
                  io.emit("IsWriting", data);
            });
            /* se envian los productos*/
            socketClient.emit("history-products", products);
            /* se recibe un nuevo producto*/
            socketClient.on("new-product", (data) => {
                  /* se guarda el producto en la variable*/
                  products.push(data);
                  /* y se emite*/
                  io.emit("notification-product", data);
            });
            /* se avisa si se desconecto el cliente*/
            socketClient.on("disconnect", () => {
                  console.log(
                        "Se desconecto el cliente con el id",
                        socketClient.id
                  );
            });
      });
}
/*funcion para emitir*/
function emit(event, data) {
      io.emit(event, data);
}

module.exports = {
      initSocket,
      emit,
};
