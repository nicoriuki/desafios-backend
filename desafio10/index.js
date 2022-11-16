import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import hbs from 'hbs';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';
import { initSocket } from './socket.js';
import viewsRouters from './routers/views/index.js';

const app = express();

const PORT = process.env.PORT;
const ENV = process.env.ENV;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
      session({
            store: new MongoStore({
                  mongoUrl: process.env.MONGO_URL,
                  ttl: 600,
            }),
            secret: '82Xl^h2L82bH',
            resave: true,
            saveUninitialized: true,
      })
);
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', viewsRouters);
const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
      console.log(`Servidor Http en el puerto ${server.address().port}`);
      console.log(`http://localhost:${server.address().port}`);
      console.log(`evironment:${ENV}`);
});

server.on('error', (err) => console.log(`error en el servidor ${err}`));
