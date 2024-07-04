import { StudentModel } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (student: TStudent) => {
  
  if (await StudentModel.isUserExists(student.id)) {
    throw new Error('User already exists');
  }
  const result = await StudentModel.create(student); // build-id static method

  // const studentData = new StudentModel(student)
  // if(await studentData.isUserExists(student.id)){
  //   throw new Error ('User already exists')
  // }
  // const result = await studentData.save() // build-in instance method provide by mongoose
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });

  // aggregating ar maddome findOne kore single data barkora
    // const result = await StudentModel.aggregate([{$match:{id:id}}])

  return result;
};

const deleteStudentfromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id },{isDeleted: true});
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentfromDB
};
