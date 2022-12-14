import { Router } from 'express';
import { fork } from 'child_process';
import logger from '../../logger.js';
const router = Router();
router.get('/random/', async (req, res, next) => {
      try {
            logger.info(`Ruta ${req.originalUrl} metodo GET`);
            let cont = req.query.cant || 100000000;
            const computo = fork('./calculo.js', [cont]);
            computo.on('message', (data) => {
                  computo.send('hola');

                  res.json(data);
            });
      } catch (error) {
            next(error);
      }
});
export default router;
