import express from 'express'
import { addCalendar,deleteCalendar,fetchCalendar, updateCalendar } from '../controllers/calendarController.js';

const calendarRouter = express.Router();

calendarRouter.post('/add',addCalendar);
calendarRouter.get('/list',fetchCalendar);
calendarRouter.put('/update/:id',updateCalendar);
calendarRouter.delete('/delete/:id',deleteCalendar);



export default calendarRouter;