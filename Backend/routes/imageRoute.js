import express from "express";
import { addImage, fetchImage } from "../controllers/imageController.js";
import upload from "../config/multer.js";

const imageRouter = express.Router();

imageRouter.post("/add", upload.single("img"), addImage);
imageRouter.get("/list", fetchImage);

export default imageRouter;
