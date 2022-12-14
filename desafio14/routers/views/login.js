import { Router } from 'express';
import passport from 'passport';
import logger from '../../logger.js';

const router = Router();

router.get('/', (req, res) => {
      if (!req.isAuthenticated()) {
            logger.info(`Ruta ${req.originalUrl} metodo GET`);
            res.render('login');
      } else {
            const { user } = req;
            let data = { user: user.email };
            res.render('home', data);
      }
});
router.post(
      '/sign-in',
      passport.authenticate('sign-in', {
            successRedirect: '/',
            failureRedirect: '/faillogin',
            failureMessage: true,
      })
);
router.get('/faillogin', (req, res) => {
      logger.info(`Ruta ${req.originalUrl} metodo GET`);
      req.session.messages = [];
      res.render('faillogin');
});

router.post('/logout', (req, res) => {
      logger.info(`Ruta ${req.originalUrl} metodo POST`);
      const { username } = req.body;
      req.logout((error) => {
            if (!error) {
                  let data = { user: username };
                  res.render('logout', data);
            } else {
                  logger.error(
                        `Ruta ${req.originalUrl} metodo POST, ${error.message}`
                  );
                  res.send('Ocurrio un  error', error.message);
            }
      });
});

export default router;
