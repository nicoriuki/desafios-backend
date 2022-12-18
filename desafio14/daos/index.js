let Mensaje, Producto;
switch ('mongodb') {
      case 'mongodb':
            const { default: MensajesDaosMongoDb } = await import(
                  './mensajes/MensajesDaosMongodb.js'
            );
            Mensaje = new MensajesDaosMongoDb();
            const { default: ProductosDaosMongoDb } = await import(
                  './productos/ProductosDaosMongodb.js'
            );
            Producto = new ProductosDaosMongoDb();

            await Mensaje.connect();
            break;

      default:
            break;
}
export { Mensaje, Producto };
