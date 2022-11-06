import { Router } from 'express';
import home from './home.js';
import productoTest from './productoTest.js';

const router = Router();
router.use('/', home, productoTest);

export default router;
