import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Semester Registration is created successfully!',
    data: result,
  });
});
const getAllSemesterRegistrations = catchAsync(
  async (req, res) => {
    const result =
      await semesterRegistrationServices.getAllSemesterRegistrationsFromDB(
        req.query,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is retrieved successfully !',
      data: result,
    });
  },
);
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const {id}= req.params
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Semester Registration retrieved successfully!',
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const {id}= req.params
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Semester Registration is updated successfully!',
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration
};
