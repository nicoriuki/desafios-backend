import { Router } from 'express';

const router = Router();

router.get('/info', (req, res, next) => {
      try {
            const data = {
                  arg: process.argv.slice(2),
                  so: process.platform,
                  vn: process.version,
                  rss: process.memoryUsage().rss,
                  pe: process.execPath,
                  pid: process.pid,
                  carp: process.cwd(),
            };

            res.render('./info', data);
      } catch (error) {
            next(error);
      }
});

export default router;
