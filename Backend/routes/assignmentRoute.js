import express from 'express'
import { addAssignment,deleteAssignment,fetchAssignment, updateAssignment } from '../controllers/assignmentController.js';

const assignmentRouter = express.Router();

assignmentRouter.post('/add',addAssignment);
assignmentRouter.get('/list',fetchAssignment);
assignmentRouter.put('/update/:id',updateAssignment);
assignmentRouter.delete('/delete/:id',deleteAssignment);


export default assignmentRouter;