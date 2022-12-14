const express = require("express");
const path = require("path");
const cors = require("cors");
const viewsRouters = require("./routers/views");
const hbs = require("hbs");
const http = require("http");
const { initSocket } = require("./socket");
const app = express();

const PORT = process.env.PORT;
const ENV = process.env.ENV;
app.use(cors());
app.use("/", express.static(path.join(__dirname, "public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use("/", viewsRouters);
const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
      console.log(`Servidor Http en el puerto ${server.address().port}`);
      console.log(`http://localhost:${server.address().port}`);
      console.log(`evironment:${ENV}`);
});

server.on("error", (err) => console.log(`error en el servidor ${err}`));
