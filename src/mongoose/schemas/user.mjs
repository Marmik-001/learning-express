import { Schema, Types } from "mongoose";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type:mongoose.SchemaTypes.String,
    required: true,
    unique:true
  },
  name:{
    type:mongoose.SchemaTypes.String,
    required: true,
  },
  password:{
    type:mongoose.SchemaTypes.String,
    required: true,
  },
});


export const User = mongoose.model('User' , userSchema)