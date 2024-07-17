import { StudentModel } from './student.model';
import { TStudent } from './student.interface';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { userModel } from '../users/user.model';

// const createStudentIntoDB = async (student: TStudent) => {

//   if (await StudentModel.isUserExists(student.id)) {
//     throw new Error('User already exists');
//   }
//   const result = await StudentModel.create(student); // build-id static method

//   // const studentData = new StudentModel(student)
//   // if(await studentData.isUserExists(student.id)){
//   //   throw new Error ('User already exists')
//   // }
//   // const result = await studentData.save() // build-in instance method provide by mongoose
//   return result;
// };

const getAllStudentFromDB = async () => {
  // ref data ke show koranor jnno populate use kora hy
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // aggregating ar maddome findOne kore single data barkora
  // const result = await StudentModel.aggregate([{$match:{id:id}}])
  return result;
};

const updateStudentFromDB = async (id: string, payload:Partial<TStudent>) => {
  
  const result = await StudentModel.findOneAndUpdate({ id },payload)
  return result;
};

const deleteStudentfromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentfromDB,
  updateStudentFromDB
};
