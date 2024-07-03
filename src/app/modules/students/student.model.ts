import { Schema, model } from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, TStudentMethod, TStudentModel, TUserName } from './student.interface';


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    // custome validation use
    validate: {
      validator: function(value:string){
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
       return firstNameStr === value
      },
      message: 'You Must be follow capitalize format like this( Tawhidul Islam)'
    }
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent,TStudentModel, TStudentMethod>({
  id: { type: String ,unique: true, required:true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message:'{VALUE} is not valid gender '
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String,  unique: true, trim: true , required: true},
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type:guardianSchema,
    required:true
  },
  localGuardian: {
    type:localGuradianSchema,
    required:true
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

studentSchema.methods.isUserExists = async function (id:string) {
  const existingUser = await StudentModel.findOne({id})
  return existingUser;
}

export const StudentModel = model<TStudent, TStudentModel>('Student', studentSchema);
