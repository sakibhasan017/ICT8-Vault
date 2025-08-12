
import imageModel from "../models/imageModel.js";
import fs from 'fs'


const addImage = async(req,res)=>{
  const image = new imageModel({
    img:req.body.img,
    title: req.body.title
  })

  try{
      await image.save();
      res.json({success:true,message:"Image Added"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const fetchImage = async (req,res)=>{
  try{
      const image =await imageModel.find(); 
      res.json({success:true,message:image});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const updateImage = async (req,res)=>{
  try{
      await imageModel.findByIdAndUpdate(req.params.id, req.body);
      res.json({success:true,message:"Image Updated"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const deleteImage = async (req,res)=>{
  try{
      await imageModel.findByIdAndDelete(req.params.id);
      res.json({success:true,message:"Image Deleted"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export {addImage ,fetchImage ,updateImage ,deleteImage };