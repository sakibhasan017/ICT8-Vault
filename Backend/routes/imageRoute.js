import express from 'express'
import { addImage, deleteImage, fetchImage, updateImage } from '../controllers/imageController.js';

const imageRouter = express.Router();

imageRouter.post('/add',addImage);
imageRouter.get('/list',fetchImage);
imageRouter.put('/update/:id',updateImage);
imageRouter.delete('/delete/:id',deleteImage);


export default imageRouter;