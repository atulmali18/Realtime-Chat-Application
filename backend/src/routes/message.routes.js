import authMiddleware from "../middleware/auth.middleware.js";
import messageController from '../controllers/message.controller.js';
import express from 'express';

const router = express.Router();

router.get('/users',authMiddleware.authUser, messageController.getUsersForSidebar);

router.get('/:id', authMiddleware.authUser, messageController.getMessages);

router.post('/send/:id',authMiddleware.authUser, messageController.sendMessage);

export default router;