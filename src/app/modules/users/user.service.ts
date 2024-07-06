import config from '../../config';
import { TStudent } from '../students/student.interface';
import { TnewUser } from './user.interface';
import { userModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // if (await StudentModel.isUserExists(student.id)) {
  //   throw new Error('User already exists');
  // }

  // create user object
  const user: TnewUser = {};

  // if password is not given, use default password
  user.password = password || (config.default_pass as string);
  // set user role
  user.role = 'student';

  // now we have no auto genetated id so we use manually generated password
  user.id = '203010001'

  const result = await userModel.create(user);

  if(Object.keys(result).length){
    // set id, _id as user
    studentData.id = result.id;
    studentData.user = result._id
  }

  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
