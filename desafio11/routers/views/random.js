import { Router } from 'express';

const router = Router();

router.get('/random/', (req, res, next) => {
      try {
            console.log('randoms');
      } catch (error) {
            next(error);
      }
});

export default router;
