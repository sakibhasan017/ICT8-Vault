import express from 'express'
import { addNotice, deleteNotice, fetchNotice, updateNotice } from '../controllers/noticeController.js';

const noticeRouter = express.Router();

noticeRouter.post('/add',addNotice);
noticeRouter.get('/list',fetchNotice);
noticeRouter.put('/update/:id',updateNotice);
noticeRouter.delete('/delete/:id',deleteNotice);


export default noticeRouter;