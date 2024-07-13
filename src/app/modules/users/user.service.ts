import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TStudent } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_pass as string);
  // set user role
  userData.role = 'student';

  const generatedStudentId = (payload: TAcademicSemester)=>{

  }
  
  userData.id = generatedStudentId();

  // now we have no auto genetated id so we use manually generated password
  // userData.id = '2025010001';

  // create a new user
  const newUser = await userModel.create(userData);

  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id; // embading id
    studentData.user = newUser._id; // reference _id

    const newStudent = await StudentModel.create(studentData);

    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
