import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try {
      const {password, student: studentData } = req.body;
      // const zodParseData = studentValidationSchema.parse(studentData);
      const result = await UserServices.createStudentIntoDB(password,studentData);

      res.status(200).json({
        success: true,
        message: 'Student is created succesfully',
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'Student is not created ',
        error: err,
      });
    }
  };

  export const UserControllers ={
    createStudent,
  }