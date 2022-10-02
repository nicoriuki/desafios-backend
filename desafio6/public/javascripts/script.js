(function () {
      /*se definen todas la variables del  DOM */
      const d = document,
            formProduct = d.getElementById("formProduct"),
            tableProducts = d.getElementById("tableProducts"),
            nameProduct = d.getElementById("nameProduct"),
            priceProduct = d.getElementById("priceProduct"),
            imgProduct = d.getElementById("imgProduct"),
            emailUser = d.getElementById("emailUser"),
            formMessage = d.getElementById("formMessage"),
            inputMessage = d.getElementById("inputMessage"),
            isWriting = d.getElementById("isWriting"),
            messageContainer = d.getElementById("messageContainer"),
            listMessage = d.getElementById("listMessage");
      /*se definen las variables que van a almacenar los mensaje y productos */
      let products = [],
            messages = [];
      /*se conecta al socket.io */
      const socket = io("/");
      /*funcion para mostrar productos en el DOM */
      function showProducts(data) {
            const tr = d.createElement("tr");
            tr.innerHTML = `<th>${data.title}</th>
  <td>$${data.price}</td>
  <td><img src="${data.thumbnail}" alt="${data.title}"></td>`;
            tableProducts.appendChild(tr);
      }
      /*funcion para mostrar mensajes en el DOM */
      function showMessage(data) {
            const li = d.createElement("li");
            li.innerHTML = `<span class="email">${data.email}</span> <span  class="date">[${data.date}]</span><span  class="message">:${data.message}</span>`;
            listMessage.appendChild(li);
            scrollToBottom();
      }
      /*funcion para que el scroll del chat siempre este en el ultimo mensaje */
      function scrollToBottom() {
            messageContainer.scrollTop =
                  messageContainer.scrollHeight - messageContainer.clientHeight;
      }
      /*funcion para validar email */
      function validEmail() {
            const regexEmail = /\S+@\S+\.\S+/;
            if (emailUser.value === "" || !regexEmail.test(emailUser.value)) {
                  emailUser.classList.add("error");
                  return false;
            } else {
                  emailUser.classList.remove("error");

                  return true;
            }
      }
      /*funcion para mostrar quien esta escribiendo */
      function showIsWriting(data) {
            isWriting.innerText = ". ";
            isWriting.innerText = `${data} esta escribiendo`;
            setTimeout(() => {
                  isWriting.innerText = ". ";
            }, 2000);
      }
      /*se definen los lissener */

      emailUser.addEventListener("keyup", () => {
            validEmail();
      });
      formProduct.addEventListener("submit", (event) => {
            event.preventDefault();
            const data = {
                  title: nameProduct.value,
                  price: priceProduct.value,
                  thumbnail: imgProduct.value,
            };
            socket.emit("new-product", data);

            nameProduct.value = "";
            priceProduct.value = "";
            imgProduct.value = "";
            nameProduct.focus();
      });
      formMessage.addEventListener("submit", (event) => {
            event.preventDefault();
            let date = new Date().toLocaleString();
            const data = {
                  message: inputMessage.value,
                  email: emailUser.value,
                  date: date,
            };
            if (validEmail()) {
                  socket.emit("new-message", data);
                  inputMessage.value = "";
                  inputMessage.focus();
            } else {
                  alert("ingrese un email valido");
            }
      });
      socket.on("connect", () => {
            console.log("Conectados al servidor");
      });
      inputMessage.addEventListener("keyup", (e) => {
            socket.emit("new-isWriting", emailUser.value);
      });
      socket.on("history-products", (data) => {
            products = data;
            tableProducts.innerHTML = "";
            products.forEach((producto) => {
                  showProducts(producto);
            });
      });
      socket.on("history-message", (data) => {
            messages = data;
            listMessage.innerHTML = "";
            messages.forEach((message) => {
                  showMessage(message);
            });
      });
      socket.on("notification-product", (data) => {
            products.push(data);
            showProducts(data);
      });
      socket.on("notification-message", (data) => {
            messages.push(data);
            showMessage(data);
      });
      socket.on("IsWriting", (data) => {
            if (data !== emailUser.value) {
                  showIsWriting(data);
            }
      });
})();
