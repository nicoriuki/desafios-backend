const { Server } = require("socket.io");
const Contenedor = require("./controllers/mensajes");

const guardarMensajes = new Contenedor("./mensajes.txt");

let io;

let productos = [
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
let mensajes = [
      {
            mensaje: "Bienvenido",
            email: "Server@server",
            fecha: "30/9/2022, 11:39:48",
            id: 1,
      },
];
function initSocket(httpServer) {
      io = new Server(httpServer);
      setEvents(io);
}

async function setEvents(io) {
      /* const mmm = await guardarMensajes.getAll(); */
      /*   mensajes = await guardarMensajes.getAll(); */
      io.on("connect", (socketClient) => {
            console.log(
                  "Se conecto un nuevo cliente con el id",
                  socketClient.id
            );

            socketClient.emit("history-message", mensajes);
            socketClient.on("new-message", (data) => {
                  /* mensajes = []; */
                  mensajes.push(data);
                  /*   guardarMensajes.save(data); */
                  /*      console.log(mensajes); */

                  io.emit("notification", mensajes);
            });
            socketClient.on("new-escribiendo", (data) => {
                  io.emit("escribe", data);
            });
            socketClient.emit("history-productos", productos);
            socketClient.on("new-product", (data) => {
                  console.log(socketClient.id);
                  productos.push(data);
                  io.emit("notification-product", data);
            });
            socketClient.on("disconnect", () => {
                  console.log(
                        "Se desconecto el cliente con el id",
                        socketClient.id
                  );
            });
      });
}

function emit(event, data) {
      io.emit(event, data);
}

module.exports = {
      initSocket,
      emit,
};
