import { Router } from 'express';
import { create } from '../controllers/userController';

const router = Router();

router.post('/create', create);

export default router;