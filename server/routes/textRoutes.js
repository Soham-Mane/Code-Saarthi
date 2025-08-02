import express from 'express';
import {receiveText} from '../controller/textController.js';

const router=express.Router();
router.post('/send-text',receiveText);

export default router;