import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// const createStudent:RequestHandler = async (req, res, next) => {
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

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentfromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentFromDB(studentId,student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});




export const studentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
