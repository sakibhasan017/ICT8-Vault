import imageModel from "../models/imageModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const addImage = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "my_uploads"
    });

    // Create DB record
    const image = new imageModel({
      img: result.secure_url,
      title: req.body.title
    });

    await image.save();

    // Remove file from local uploads folder
    fs.unlinkSync(req.file.path);

    res.json({ success: true, message: "Image Added", data: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error uploading image" });
  }
};

const fetchImage = async (req, res) => {
  try {
    const images = await imageModel.find();
    res.json({ success: true, message: images });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching images" });
  }
};

export { addImage, fetchImage };
