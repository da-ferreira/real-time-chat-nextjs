import { Router } from 'express';
import userRoute from './user.route';
import chatRoute from './chat.route';
import messageRoute from './message.route';

const router = Router();

router.use('/users', userRoute);
router.use('/chats', chatRoute);
router.use('/messages', messageRoute);

export default router;
