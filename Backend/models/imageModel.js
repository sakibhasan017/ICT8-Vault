import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    img:{type:String,required:true},
    title:{type:String}
})

const imageModel= mongoose.models.image || mongoose.model("image",imageSchema);

export default imageModel;