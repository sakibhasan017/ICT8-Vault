
import noticeModel from "../models/noticeModel.js";
import fs from 'fs'


const addNotice = async(req,res)=>{
  const notice = new noticeModel({
      title:req.body.title,
      date:req.body.date,
      section:req.body.section,
      additional:req.body.additional

  })

  try{
      await notice.save();
      res.json({success:true,message:"Notice Added"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const fetchNotice = async (req,res)=>{
  try{
      const notice =await noticeModel.find(); 
      res.json({success:true,message:notice});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export {addNotice,fetchNotice};