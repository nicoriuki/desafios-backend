const express = require("express");
const path = require("path");
const cors = require("cors");
const apiRouters = require("./routers/api");
const viewsRouters = require("./routers/views");

const app = express();

const PORT = process.env.PORT;
const ENV = process.env.ENV;
app.use(cors());
app.use("/", express.static(path.join(__dirname, "public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api", apiRouters);
app.use("/", viewsRouters);

const server = app.listen(PORT, () => {
      console.log(`Servidor Http en el puerto ${server.address().port}`);
      console.log(`http://localhost:${server.address().port}`);
      console.log(`evironment:${ENV}`);
});

server.on("error", (err) => console.log(`error en el servidor ${err}`));
