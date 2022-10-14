(function () {
      /*se definen todas la variables del  DOM */
      const d = document,
            formProduct = d.getElementById('formProduct'),
            tableProducts = d.getElementById('tableProducts'),
            nameProduct = d.getElementById('nameProduct'),
            priceProduct = d.getElementById('priceProduct'),
            codProduct = d.getElementById('codProduct'),
            stockProduct = d.getElementById('stockProduct'),
            imgProduct = d.getElementById('imgProduct'),
            idProduct = d.getElementById('idProduct'),
            emailUser = d.getElementById('emailUser'),
            formMessage = d.getElementById('formMessage'),
            inputMessage = d.getElementById('inputMessage'),
            isWriting = d.getElementById('isWriting'),
            btnMessage = d.getElementById('btnMessage'),
            enterEmail = d.getElementById('enterEmail'),
            messageContainer = d.getElementById('messageContainer'),
            listMessage = d.getElementById('listMessage');
      /*se definen las variables que van a almacenar los mensaje y productos */
      let products = [],
            messages = [];

      d.addEventListener('DOMContentLoaded', (e) => {});

      /*se conecta al socket.io */
      const socket = io('/');
      /*funcion para mostrar productos en el DOM */
      function showProducts(data) {
            const tr = d.createElement('tr');
            tr.innerHTML = `<th>${data.nombre}</th>
  <td>$${data.precio}</td>
  <td><img src="${data.imagen}" alt="${data.nombre}"></td>
  <td>${data.codigo}</td>
  <td>${data.stock}</td>
  <td><img src="https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_09-512.png" alt="editar" class="editar" id="${data.id}"/> <img src="https://cdn4.iconfinder.com/data/icons/digital-marketing-7-2/35/303-512.png" alt="borrar" class="borrar" id="${data.id}"/></td>`;
            tableProducts.appendChild(tr);
      }

      function deleteProducts(id) {
            let isOk = confirm(
                  `Esta seguro de borrar el producto con id ${id}`
            );
            isOk && socket.emit('delete-product', id);
      }
      d.addEventListener('click', (e) => {
            if (e.target.matches('.borrar')) {
                  deleteProducts(e.target.id);
            }
      });
      async function editProducts(id) {
            await socket.emit('getId-product', id);
            await socket.on('one-product', (data) => {
                  nameProduct.value = data.nombre;
                  priceProduct.value = data.precio;
                  imgProduct.value = data.imagen;
                  codProduct.value = data.codigo;
                  stockProduct.value = data.stock;
                  idProduct.value = data.id;
                  nameProduct.focus();
            });
      }
      d.addEventListener('click', (e) => {
            if (e.target.matches('.editar')) {
                  editProducts(e.target.id);
            }
      });
      /*funcion para mostrar mensajes en el DOM */
      function showMessage(data) {
            const li = d.createElement('li');
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
            if (emailUser.value === '' || !regexEmail.test(emailUser.value)) {
                  emailUser.classList.add('error');
                  btnMessage.classList.add('hidden');
                  enterEmail.classList.remove('hidden');
                  return false;
            } else {
                  emailUser.classList.remove('error');
                  btnMessage.classList.remove('hidden');
                  enterEmail.classList.add('hidden');

                  return true;
            }
      }
      /*funcion para mostrar quien esta escribiendo */
      function showIsWriting(data) {
            isWriting.innerText = '. ';
            isWriting.innerText = `${data} esta escribiendo`;
            setTimeout(() => {
                  isWriting.innerText = '. ';
            }, 2000);
      }
      /*se definen los lissener */

      emailUser.addEventListener('keyup', () => {
            validEmail();
      });
      formProduct.addEventListener('submit', (event) => {
            event.preventDefault();
            if (idProduct.value.length != 0) {
                  const data = {
                        nombre: nameProduct.value,
                        precio: priceProduct.value,
                        imagen: imgProduct.value,
                        codigo: codProduct.value,
                        stock: stockProduct.value,
                        id: idProduct.value,
                  };

                  socket.emit('edit-product', data);
            } else {
                  const data = {
                        nombre: nameProduct.value,
                        precio: priceProduct.value,
                        imagen: imgProduct.value,
                        codigo: codProduct.value,
                        stock: stockProduct.value,
                  };

                  socket.emit('new-product', data);
            }

            nameProduct.value = '';
            priceProduct.value = '';
            imgProduct.value = '';
            codProduct.value = '';
            stockProduct.value = '';
            idProduct.value = '';
            nameProduct.focus();
      });
      formMessage.addEventListener('submit', (event) => {
            event.preventDefault();
            let date = new Date().toLocaleString();
            const data = {
                  message: inputMessage.value,
                  email: emailUser.value,
                  date: date,
            };
            if (validEmail()) {
                  socket.emit('new-message', data);
                  inputMessage.value = '';
                  inputMessage.focus();
            }
      });
      socket.on('connect', () => {
            console.log('Conectados al servidor');
      });

      inputMessage.addEventListener('keyup', (e) => {
            socket.emit('new-isWriting', emailUser.value);
      });
      const obtener = async () => {
            await socket.on('history-products', (data) => {
                  products = data;
                  tableProducts.innerHTML = '';
                  products.forEach((producto) => {
                        showProducts(producto);
                  });
            });
      };
      obtener();
      socket.on('history-message', (data) => {
            messages = data;
            listMessage.innerHTML = '';
            messages.forEach((message) => {
                  showMessage(message);
            });
      });
      socket.on('notification-product', (data) => {
            products.push(data);
            showProducts(data);
      });
      socket.on('notification-message', (data) => {
            messages.push(data);
            showMessage(data);
      });
      socket.on('IsWriting', (data) => {
            if (data !== emailUser.value) {
                  showIsWriting(data);
            }
      });
})();
