import { Router } from 'express';
import passport from 'passport';
import logger from '../../logger.js';
const router = Router();

router.get('/registro', (req, res, next) => {
      logger.info(`Ruta ${req.originalUrl} metodo GET`);
      res.render('registro');
});

router.get('/failregister', (req, res) => {
      logger.info(`Ruta ${req.originalUrl} metodo GET`);
      res.render('failregister');
});
router.post(
      '/sign-up',
      passport.authenticate('sign-up', {
            successRedirect: '/',
            failureRedirect: '/failregister',
      }),
      (req, res) => {
            logger.info(`Ruta ${req.originalUrl} metodo POST`);
            const { user } = req;
            console.log('register -> user', user);
      }
);
export default router;
