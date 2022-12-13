import express from 'express';
import cors from 'cors';
import session from 'express-session';
import hbs from 'hbs';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';
import { initSocket } from './socket.js';
import viewsRouters from './routers/views/index.js';
import apiRouters from './routers/api/index.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import UserModel from './model/user.js';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';

const salt = bcrypt.genSaltSync(10);

const app = express();

const opts = {
      default: {
            port: 8080,
            mode: 'fork',
      },
      alias: {
            p: 'port',
            m: 'mode',
      },
};

const { port: PORT, mode } = minimist(process.argv.slice(2), opts);

const ENV = process.env.ENV;
if (mode === 'cluster' && cluster.isPrimary) {
      for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
            console.log(
                  `worker ${worker.process.pid} | code ${code} | signal ${signal}`
            );
            console.log('Starting a new worker...');
            cluster.fork();
      });
} else {
      const salt = bcrypt.genSaltSync(10);

      const app = express();
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      passport.use(
            'sign-in',
            new LocalStrategy(
                  {
                        usernameField: 'email',
                  },
                  (email, password, done) => {
                        UserModel.findOne({ email })
                              .then((user) => {
                                    if (!user) {
                                          console.log(
                                                `User with ${email} not found.`
                                          );

                                          return done(null, false, {
                                                message: `El usuario ${email} no fue encontrado`,
                                          });
                                    }

                                    if (
                                          !bcrypt.compareSync(
                                                password,
                                                user.password
                                          )
                                    ) {
                                          console.log('Invalid Password');

                                          return done(null, false, {
                                                message: 'Contraseña invalida',
                                          });
                                    }
                                    done(null, user);
                              })
                              .catch((error) => {
                                    console.log(
                                          'Error in login\n',
                                          error.message
                                    );
                                    done(error);
                              });
                  }
            )
      );

      passport.use(
            'sign-up',
            new LocalStrategy(
                  {
                        usernameField: 'email',
                        passReqToCallback: true,
                  },
                  (req, email, password, done) => {
                        UserModel.findOne({ email })
                              .then((user) => {
                                    if (user) {
                                          console.log(
                                                `User ${email} already exists.`
                                          );

                                          return done(null, false);
                                    } else {
                                          const salt = bcrypt.genSaltSync(10);
                                          const hash = bcrypt.hashSync(
                                                req.body.password,
                                                salt
                                          );
                                          req.body.password = hash;

                                          return UserModel.create(req.body);
                                    }
                              })
                              .then((newUser) => {
                                    console.log(newUser);
                                    if (newUser) {
                                          console.log(
                                                `User ${newUser.email} registration succesful.`
                                          );

                                          done(null, newUser);
                                    } else {
                                          throw new Error(
                                                'User already exists'
                                          );
                                    }
                              })
                              .catch((error) => {
                                    console.log(
                                          'Error in sign-up',
                                          error.message
                                    );
                                    return done(error);
                              });
                  }
            )
      );

      passport.serializeUser((user, done) => {
            done(null, user._id);
      });

      passport.deserializeUser((_id, done) => {
            UserModel.findOne({ _id })
                  .then((user) => done(null, user))
                  .catch(done);
      });

      app.use(
            session({
                  secret: '4*#J8f9N59!w',
                  cookie: {
                        httpOnly: false,
                        secure: false,
                        maxAge: 600000,
                  },
                  rolling: true,
                  resave: false,
                  saveUninitialized: false,
            })
      );
      app.use(passport.initialize());
      app.use(passport.session());

      app.use(cors());
      app.use('/', express.static(path.join(__dirname, 'public/')));
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'hbs');

      app.use('/', viewsRouters);
      app.use('/api', apiRouters);
      const server = http.createServer(app);
      initSocket(server);

      server.listen(PORT, () => {
            console.log(`Servidor Http en el puerto ${server.address().port}`);
            console.log(`http://localhost:${server.address().port}`);
            console.log(`evironment:${ENV}`);
      });

      server.on('error', (err) => console.log(`error en el servidor ${err}`));
}
