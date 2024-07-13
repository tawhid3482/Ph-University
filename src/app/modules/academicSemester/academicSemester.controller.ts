import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';
import { academicSemesterModel } from './academicSemester.model';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester create successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester are retrieved succesfully',
    data: result,
  });
});
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const {_id}= req.params;
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester are retrieved succesfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async(req,res)=>{
  const {_id}= req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterFromDB(_id);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message: 'Academic Semester are updated succesfully',
    data:result
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester
};
