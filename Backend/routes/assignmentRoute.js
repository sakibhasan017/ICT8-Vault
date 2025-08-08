import express from 'express'
import { addAssignment,fetchAssignment } from '../controllers/assignmentController.js';

const assignmentRouter = express.Router();

assignmentRouter.post('/add',addAssignment);
assignmentRouter.get('/list',fetchAssignment);


export default assignmentRouter;