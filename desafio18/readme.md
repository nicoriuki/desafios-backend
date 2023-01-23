# API De Nicolas Marquez

## Mejorar la arquitectura de nuestra API

## Configuración

Primero debemos crear un archivo en la raiz proyecto con el nombre `.env` con el siguiente contenido y completar los datos de la BD , solo funciona con mongoDb

```
PORT=8080
ENV=local
DAO_TARGET =mongo
```

## Expicacion

Para iniciar el test http hay que ejecutar el servidor con npm start dev y despues el clinete http node httpClientAxion.js las pruebas se van a ver en la consola del servidor
para iniciar la pruebga mocha chai supertest hay que ejecutar npm test y los resultados se guardan en la carpeta test/testMochaChaiSupertest.log

## Inciar app

```
npm run dev
```
