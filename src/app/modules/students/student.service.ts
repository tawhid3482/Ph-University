import { get } from "mongoose";
import { StudentModel } from "./student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async (student: TStudent) => {
    // const result = await StudentModel.create(student); // build-id static method

    const studentData = new StudentModel(student)
    if(await studentData.isUserExists(student.id)){
      throw new Error ('User already exists')
    }
    const result = await studentData.save() // build-in instance method provide by mongoose
    
     return result;


  };

  const getAllStudentFromDB = async()=>{
    const result = await StudentModel.find();
    return result
  }
  const getSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ id });
    return result;
  };

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentFromDB
}