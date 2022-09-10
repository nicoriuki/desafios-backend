const express = require("express");
const Contenedor = require("./clases.js");
/* se instacia la clase*/
const productos = new Contenedor("productos.txt");
/* se inicializa el servidor */
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
      console.log(
            `Servidor http escuchando en el puerto ${server.address().port}`
      );
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

/*mensaje de pagina principal*/
app.get("/", (req, res) => {
      res.send(
            '<h1 style="color: blue">Bienvenidos al servidor   express</h1>'
      );
});
/*pagina de productos */
app.get("/productos", (req, res) => {
      const ejecutar = async () => {
            /*su usa el medo getAll para traer todos los productos */
            const arrayProductos = await productos.getAll();
            /*se crea un template para mostrar los productos */
            let template = ``;
            arrayProductos.map(
                  (item) =>
                        (template += `<h1 style="color: blue">${item.title} </h1>\n <h2 >Precio $<span style="color: red">${item.price}</span></h2>\n<img width="50px" height="auto"src="${item.thumbnail}">`)
            );
            res.send(template);
      };
      ejecutar();
});
/*pagina de producto random */
app.get("/productoRandom", (req, res) => {
      const random = async () => {
            /* se traen todos los productos */
            const arrayProductos = await productos.getAll();
            /* se crea un numero al azar a partir de el length de arrayProductos */
            let numero = Math.floor(
                  Math.random() * (arrayProductos.length - 1 + 1)
            );
            let productoRandom = [];
            /*el numero creado al hacer se compara con el indice de arrayProductos y ese es el producto a mostrar */
            const listaProductos = arrayProductos.map(
                  (item, index) => index === numero && productoRandom.push(item)
            );
            /*se crea un template para mostrar el producto */
            let template = `<h1 style="color: blue">${productoRandom[0].title} </h1>\n <h2 >Precio $<span style="color: red">${productoRandom[0].price}</span></h2>\n<img width="50px" height="auto"src="${productoRandom[0].thumbnail}">`;
            res.send(template);
      };
      random();
});
