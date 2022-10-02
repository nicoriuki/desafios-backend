const fs = require("fs");
class MessageController {
      constructor(archivo) {
            this.archivo = archivo;
      }
      /* Metodo para  Escribir en el archivo*/
      async escribirArchivo(archivo, contenido) {
            try {
                  await fs.writeFileSync(
                        archivo,
                        JSON.stringify(contenido, null, 2),
                        "utf-8"
                  );
            } catch (error) {
                  console.log(error.message);
            }
      }
      /* Metodo para  Leer el archivo*/
      async leerArchivo(archivo) {
            try {
                  const data = await fs.readFileSync(archivo, "utf-8");
                  return JSON.parse(data);
            } catch (error) {
                  console.log(error.message);
            }
      }
      /* Metodo para  saber si existe el archivo*/
      saberSiExiste(archivo) {
            try {
                  if (!fs.existsSync(archivo)) {
                        throw new Error("El archivo no se encontro!!");
                  } else {
                        return true;
                  }
            } catch (error) {
                  console.log(error.message);
            }
      }

      /* Metodo save para guardar un nuevo Mensaje en el archivo*/
      async save(message) {
            try {
                  /*Primero verifica si existe el archivo, si no exite crea uno nuevo */
                  if (!this.saberSiExiste(this.archivo)) {
                        /*Se crea un objeto vacio */
                        let arrayMessages = [];

                        arrayMessages.push(message);

                        /* se escribe el archivo*/
                        await this.escribirArchivo(this.archivo, arrayMessages);

                        return;
                  } else {
                        /*Si el archivo existe  primero se verifica si esta vacio*/
                        if (this.leerArchivo(this.archivo)) {
                              const data = await this.leerArchivo(this.archivo);

                              data.push(message);

                              /*se escribe el producto */
                              this.escribirArchivo(this.archivo, data);
                        }
                  }
            } catch (error) {
                  console.log(error.message);
            }
      }

      /*Metodo getAll para obtener todos los mensajes*/
      async getAll() {
            try {
                  /*Primero verifica si existe el archivo, */
                  if (this.saberSiExiste(this.archivo)) {
                        const data = await this.leerArchivo(this.archivo);

                        /* se verifica si el archivo esta vacio */
                        if (data.length !== 0) {
                              return data;
                        } else {
                              /*si esta vacio se lanza un error */
                              throw new Error(
                                    `el archivo ${this.archivo} esta vacio`
                              );
                        }
                  }
            } catch (error) {
                  console.log(error.message);
            }
      }
}
module.exports = MessageController;
