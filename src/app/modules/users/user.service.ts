import { TStudent } from "../students/student.interface";
import { userModel } from "./user.model";

const createStudentIntoDB = async (student: TStudent) => {
  
    // if (await StudentModel.isUserExists(student.id)) {
    //   throw new Error('User already exists');
    // }
    const result = await userModel.create(student); // build-id static method
    return result;
  };

  export const UserServices = {
    createStudentIntoDB,
  }