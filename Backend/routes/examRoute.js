import express from 'express'
import { addExam, deleteExam, fetchExam, updateExam } from '../controllers/examController.js';

const examRouter = express.Router();

examRouter.post('/add',addExam);
examRouter.get('/list',fetchExam);
examRouter.put('/update/:id',updateExam);
examRouter.delete('/delete/:id',deleteExam);


export default examRouter;