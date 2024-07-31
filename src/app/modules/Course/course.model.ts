import { model, Schema, Types } from 'mongoose';
import { TCourse, TCourseFaculties, TPreRequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId , ref:'Course'},
  isDeleted: {type: Boolean, default: false} 
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, unique: true, trim: true, required: true },
  prefix: { type: String, trim: true, required: true },
  code: { type: Number, required: true },
  credits: { type: Number, required: true },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {type: Boolean, default: false} 

});

const courseFacultiesSchema = new Schema <TCourseFaculties>({
  course:{type:Schema.Types.ObjectId}
})

export const courseModel = model<TCourse>('Course', courseSchema)
