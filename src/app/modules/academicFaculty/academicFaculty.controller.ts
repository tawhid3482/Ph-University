import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created Successfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrived Successfully',
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrived Successfully',
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty updated Successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty
};
