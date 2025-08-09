import mongoose from "mongoose";

const examSchema =new mongoose.Schema({
    course:{type:String,required:true},
    topic: {type:String,required:true},
    date: {type:String,required:true},
    time: {type:String,required:true},
    section: {type:String,required:true},
    examType: {type:String},
    additional: {type:String}
  })

  const examModel= mongoose.models.exams || mongoose.model('exams',examSchema);

  export default examModel;