import { Router } from 'express';
import productoTest from './productoTest.js';
import login from './login.js';

const router = Router();
router.use('/', productoTest, login);

export default router;
