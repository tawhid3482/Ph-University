import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, unique: true, required: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await academicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new Error('This Department already exist');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function(next){
  
next()
})


export const academicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema
);
