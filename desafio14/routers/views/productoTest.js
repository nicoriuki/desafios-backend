import { Router } from 'express';
import { faker } from '@faker-js/faker';
import logger from '../../logger.js';

faker.locale = 'es';
const { commerce, image } = faker;

const router = Router();

router.get('/producto-test/', (req, res, next) => {
      try {
            let data = { data: [] };

            for (let i = 0; i < 5; i++) {
                  data.data.push({
                        nombre: commerce.product(),
                        precio: commerce.price(),
                        imagen: image.technics(),
                  });
            }
            logger.info(`Ruta ${req.originalUrl} metodo GET`);
            res.render('./test/producto-test', data);
      } catch (error) {
            next(error);
      }
});

export default router;
