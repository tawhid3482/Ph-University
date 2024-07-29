import { Schema } from "mongoose";
import { TCourse } from "./course.interface";

const courseSchema = new Schema<TCourse>({
    title:{type:String, required:true},
    prefix:{type:String, required:true},
    code:{type:Number, required:true},
    credits:{type:Number, required:true},
})