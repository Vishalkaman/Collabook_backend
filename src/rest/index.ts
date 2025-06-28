import express, { Router } from 'express';
import userRoutes from './user';
import codeRoutes from './code';

const router: Router = express.Router();

router.use('/users', userRoutes);
router.use('/code', codeRoutes);

export default router;

