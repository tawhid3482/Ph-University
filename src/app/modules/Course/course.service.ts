import { TCourse } from './course.interface';
import { courseModel } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await courseModel.create(payload);
  return result;
};
const getAllCourseFromDB = async () => {
  const result = await courseModel.find();
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await courseModel.findById(id);
  return result;
};
const deleteCourseFromDB = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(id, {
    isDeleted: true,
  }, {
    new:true
  }
);
  return result;
};
const updateCourseFromDB = async (id: string, payload: TCourse) => {
  const result = await courseModel.findByIdAndUpdate(id, payload);
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseFromDB
};
