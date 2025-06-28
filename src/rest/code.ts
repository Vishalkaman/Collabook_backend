import express, { Router } from 'express';
import { runCode } from '../controllers/code';

const router: Router = express.Router();

router.post('/run', runCode);

export default router;
