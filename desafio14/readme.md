# API De Nicolas Marquez

## Configuración

Primero debemos crear un archivo en la raiz proyecto con el nombre `.env` con el siguiente contenido y completar los datos de la BD

```
NODE_PORT=8080
NODE_ENV=local
BASE_HOST=http://localhost:8080
MONGO_URL

variables para usar mysql para la tabla de productos
DB_NAME
 DB_HOST
 DB_PORT
 DB_USER
 DB_PASSWORD
```

Acá estamos configurando una variable de entorno para nuestro proyecto, en este caso el puerto que usará el servidor.

## Rutas

### Principal

http://localhost:8080

## Resultados

### Gzip

Con compresion dio 1.1Kb
Sin compresion dio 1.7Kb

## Test

En el Proyecto cree una carpeta que dice resultados, estan todos los resultados de todos los Test , no llegue ha pasarlos en PDF igualmente me parece que estan mejor en esa carpeta

### Tener en cuenta que el archivo de configuracion de nginx esta puesta la ruta public de mi pc , hay que cambiarlar a donde se descargue el proyecto
