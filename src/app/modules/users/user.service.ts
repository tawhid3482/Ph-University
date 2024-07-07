import config from '../../config';
import { TStudent } from '../students/student.interface';
import { TUser } from './user.interface';
import { userModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_pass as string);
  // set user role
  userData.role = 'student';

  // now we have no auto genetated id so we use manually generated password
  userData.id = '203010001';

  const result = await userModel.create(userData);

  if (Object.keys(result).length) {
    // set id, _id as user
    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
