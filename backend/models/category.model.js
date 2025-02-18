import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: false
  },
  image:{
    type:String,
    required:true,
  }
});

export const Category = mongoose.model("Category", categorySchema)