import express from 'express'
import { addNotify,fetchNotify } from '../controllers/notifyController.js';

const notifyRouter = express.Router();

notifyRouter.post('/add',addNotify);
notifyRouter.get('/list',fetchNotify);


export default notifyRouter;