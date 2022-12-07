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

### Test Productos

http://localhost:8080/producto-test

### Info del sistema

http://localhost:8080/info

### Random (fork)

Poner la cantidad de numeros a calcular
http://localhost:8080/random.html

## Ejecutar en Test

```sh
npm run dev:wait
```

### Probar entre Fork y Cluster manejado por node

```sh
npm run dev:wait -- -p 8080 -m fork
npm run dev:wait -- -p 8080 -m cluster
```

### Probar Forever

```sh
forever start -w --minUptime=1000 --spinSleepTime=1000 index.js -p 8080
Get-Process
```

### Probar Con PM2

```sh
pm2 start index.js --name="prueba1" --watch -- -- -p 8080
pm2 start index.js --name="prueba2" --watch -i max -- -- -p 8081
pm2 list
Get-Process
```

### Tener en cuenta que el archivo de configuracion de nginx esta puesta la ruta public de mi pc , hay que cambiarlar a donde se descargue el proyecto
