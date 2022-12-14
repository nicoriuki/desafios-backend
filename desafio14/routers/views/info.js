import { Router } from 'express';
import os from 'os';
import logger from '../../logger.js';
import compression from 'compression';
const router = Router();

router.get('/info', (req, res, next) => {
      try {
            const data = {
                  cpus: os.cpus().length,
                  arg: process.argv.slice(2),
                  so: process.platform,
                  vn: process.version,
                  rss: process.memoryUsage().rss,
                  pe: process.execPath,
                  pid: process.pid,
                  carp: process.cwd(),
            };
            logger.info(`Ruta ${req.originalUrl} metodo GET`);
            res.render('./info', data);
      } catch (error) {
            next(error);
      }
});

export default router;
