import { Router } from 'express';
import { create, login } from '../controllers/user.controller';

const router = Router();

router.post('/create', create);
router.post('/login', login);

export default router;
