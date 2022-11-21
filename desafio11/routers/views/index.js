import { Router } from 'express';
import productoTest from './productoTest.js';
import login from './login.js';
import registro from './registro.js';

const router = Router();
router.use('/', productoTest, login, registro);

export default router;
