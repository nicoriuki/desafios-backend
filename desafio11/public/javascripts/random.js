const d = document,
      cantidad = d.getElementById('cantidad'),
      lista = document.getElementById('lista'),
      loader = document.getElementById('loader');
enviar = d.getElementById('enviar');

enviar.addEventListener('click', (e) => {
      e.preventDefault();
      loader.classList.add('loader');
      fetch(`http://localhost:8080/api/random?cant=${cantidad.value}`)
            .then((res) => res.json())
            .then((json) => {
                  json.map((item) => {
                        loader.classList.remove('loader');
                        let li = document.createElement('li');
                        li.innerHTML = `Numero: ${item.indice} : cantidad ${item.valor}`;
                        lista.appendChild(li);
                  });
            })

            .catch((err) => err);
});
