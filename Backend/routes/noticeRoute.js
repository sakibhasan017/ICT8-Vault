import express from 'express'
import { addNotice, fetchNotice } from '../controllers/noticeController.js';

const noticeRouter = express.Router();

noticeRouter.post('/add',addNotice);
noticeRouter.get('/list',fetchNotice);


export default noticeRouter;