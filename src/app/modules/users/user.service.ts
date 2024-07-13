import config from '../../config';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_pass as string);
  // set user role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await academicSemesterModel.findById(
    payload.admissionSemester
  );

  //set  generated id
  userData.id = await generatedStudentId(admissionSemester);
  // now we have no auto genetated id so we use manually generated password
  // userData.id = '2025010001';

  // create a new user
  const newUser = await userModel.create(userData);

  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id; // embading id
    payload.user = newUser._id; // reference _id

    const newStudent = await StudentModel.create(payload);

    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
