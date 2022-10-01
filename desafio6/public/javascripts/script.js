(function () {
      const d = document,
            formProduct = d.getElementById("formProduct"),
            tableProducts = d.getElementById("tableProducts"),
            nombreProduct = d.getElementById("nombreProduct"),
            priceProduct = d.getElementById("priceProduct"),
            imgProduct = d.getElementById("imgProduct"),
            emailUser = d.getElementById("emailUser"),
            formMensaje = d.getElementById("formMensaje"),
            mensaje = d.getElementById("mensaje"),
            estaEscribiendo = d.getElementById("estaEscribiendo"),
            listaMensajes = d.getElementById("listaMensajes");

      let productos = [],
            mensajes = [];

      const socket = io("/");

      function showProductos(data) {
            const tr = d.createElement("tr");
            tr.innerHTML = `<th>${data.title}</th>
  <td>$${data.price}</td>
  <td><img src="${data.thumbnail}" alt="${data.title}"></td>`;
            tableProducts.appendChild(tr);
      }
      function showMessage(data) {
            const li = d.createElement("li");
            li.innerHTML = `<span class="email">${data.email}</span> <span  class="fecha">[${data.fecha}]</span><span  class="mensaje">:${data.mensaje}</span>`;
            listaMensajes.appendChild(li);
      }
      function showEscribe(data) {
            estaEscribiendo.innerText = ". ";
            estaEscribiendo.innerText = `${data} esta escribiendo`;
            setTimeout(() => {
                  estaEscribiendo.innerText = ". ";
            }, 1000);
      }
      formProduct.addEventListener("submit", (event) => {
            event.preventDefault();
            const data = {
                  title: nombreProduct.value,
                  price: priceProduct.value,
                  thumbnail: imgProduct.value,
            };
            socket.emit("new-product", data);

            nombreProduct.value = "";
            priceProduct.value = "";
            imgProduct.value = "";
            nombreProduct.focus();
      });
      formMensaje.addEventListener("submit", (event) => {
            event.preventDefault();
            let date = new Date().toLocaleString();
            const data = {
                  mensaje: mensaje.value,
                  email: emailUser.value,
                  fecha: date,
            };
            socket.emit("new-message", data);
            mensaje.value = "";
            mensaje.focus();
      });
      socket.on("connect", () => {
            console.log("Conectados al servidor");

            console.log(socket.id);
      });
      mensaje.addEventListener("keyup", (e) => {
            socket.emit("new-escribiendo", emailUser.value);
      });
      socket.on("history-productos", (data) => {
            productos = data;
            tableProducts.innerHTML = "";
            productos.forEach((producto) => {
                  showProductos(producto);
            });
      });

      socket.on("history-message", (data) => {
            mensajes = data;
            listaMensajes.innerHTML = "";
            mensajes.forEach((mensaje) => {
                  showMessage(mensaje);
            });
      });
      socket.on("notification-product", (data) => {
            productos.push(data);
            showProductos(data);
      });
      socket.on("notification", (data) => {
            mensaje.push(data);
            showMessage(data);
      });
      socket.on("escribe", (data) => {
            showEscribe(data);
      });
})();
