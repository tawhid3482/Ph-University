import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// const createStudent = async (req: Request, res: Response, next:NextFunction) => {
//   try {
//     const { student: studentData } = req.body;
//     const zodParseData = studentValidationSchema.parse(studentData);
//     const result = await StudentServices.createStudentIntoDB(zodParseData);

//     //{ //  if i use joi validation
//     // data validate using joi

//     // const {error,value} = studentValidationSchema.validate(studentData)
//     // if(error){
//     //   res.status(500).json({
//     //     success: false,
//     //     message: 'Student is not created ',
//     //     error: error.details,
//     //   });
//     // }}

//     res.status(200).json({
//       success: true,
//       message: 'Student is created succesfully',
//       data: result,
//     });
//   } catch (err) {
//    next(err)
//   }
// };

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentfromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
