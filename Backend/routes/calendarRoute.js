import express from 'express'
import { addCalendar,fetchCalendar } from '../controllers/calendarController.js';

const calendarRouter = express.Router();

calendarRouter.post('/add',addCalendar);
calendarRouter.get('/list',fetchCalendar);


export default calendarRouter;