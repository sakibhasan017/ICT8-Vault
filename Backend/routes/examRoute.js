import express from 'express'
import { addExam, fetchExam } from '../controllers/examController.js';

const examRouter = express.Router();

examRouter.post('/add',addExam);
examRouter.get('/list',fetchExam);


export default examRouter;