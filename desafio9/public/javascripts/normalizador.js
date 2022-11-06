const tituloMensajes = document.getElementById('tituloMensajes');
export const normalizador = async (data) => {
      const autorScheme = new normalizr.schema.Entity(
            'author',
            {},
            { idAttribute: 'email' }
      );

      const textS = new normalizr.schema.Entity('text');
      const mensajeScheme = new normalizr.schema.Entity('mensaje', {
            author: autorScheme,
      });
      const mensajeTotla = new normalizr.schema.Entity('mensaje', {
            mensaje: [mensajeScheme],
      });
      /*  console.log(data); */
      const dataReversed = normalizr.denormalize(
            data.result,
            mensajeTotla,
            data.entities
      );

      /*  console.log(dataReversed);

      console.log(
            '--------------------------------------------------------------------'
      ); */
      const originalSize = JSON.stringify(dataReversed).length;
      const normalizedSize = JSON.stringify(data).length;
      const resultSata = (normalizedSize * 100) / originalSize;
      let totalTotal = resultSata.toFixed(2);

      /* console.log('Porcentage de compresion:', resultSata.toFixed(2), '%'); */
      tituloMensajes.innerText = `Porcentaje de compresion: ${totalTotal}%`;
      const messages = dataReversed.mensaje;
      listMessage.innerHTML = '';
      /* console.log(messages); */
      return messages;
};
