import express, { Router } from 'express';
import { getUsers, createUser } from '../controllers/user';

const router: Router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

export default router;
