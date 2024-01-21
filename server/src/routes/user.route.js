import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.post('/create', userController.create);
router.post('/login', userController.login);
router.get('/find/:id', userController.findById);
router.get('/', userController.findAll);

export default router;
