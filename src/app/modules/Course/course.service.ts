import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableField } from './course.constant';
import { TCourse } from './course.interface';
import { courseModel } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await courseModel.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    courseModel.find().populate('preRequisiteCourses.course'),
    query
  )
    .search(CourseSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await courseModel
    .findById(id)
    .populate('preRequisiteCourses.course');
  return result;
};
const deleteCourseFromDB = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemaining } = payload;

  // step:1
  const updatedBasicCourseInfo = await courseModel.findByIdAndUpdate(
    id,
    courseRemaining,
    {
      new: true,
      runValidators: true,
    }
  );

  // now check the preRequisiteCourses
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out the deleted fields
    const deletedPreRequisites = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisiteCourses = await courseModel.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } },
    });

    // filter out the new course fields
    const newPreRequisite = preRequisiteCourses?.filter(
      (el) => el.course && !el.isDeleted
    );
    const newPreRequisiteCourses = await courseModel.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
    });
  }

  const result = await courseModel.findById(id).populate("preRequisiteCourses.course")

  return result
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
};
