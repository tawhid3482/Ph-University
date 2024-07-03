import { Request, Response } from "express";
import { StudentServices } from "./student.service";
// import studentValidationSchema from "./student.validation-joi";

const createStudent = async (req: Request, res: Response) => {
    try {
      const { student: studentData } = req.body;
      // data validate using joi 
      // const {error,value} = studentValidationSchema.validate(studentData)
      
      const result = await StudentServices.createStudentIntoDB(studentData);
  
      if(error){
        res.status(500).json({
          success: false,
          message: 'Student is not created ',
          error: error.details,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Student is created succesfully',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Student is not created ',
        error: err,
      });
    }
  };

  const getAllStudent = async(req:Request, res:Response )=>{
    try{

        const result = await StudentServices.getAllStudentFromDB()
        res.status(200).json({
            success: true,
            message: 'Student are retrieved succesfully',
            data: result,
          });

    }catch(error){
        console.log(error)
    }
  }
  const getSingleStudent = async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
  
      const result = await StudentServices.getSingleStudentFromDB(studentId);
  
      res.status(200).json({
        success: true,
        message: 'Student is retrieved succesfully',
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const studentControllers = {
    createStudent,
    getAllStudent,
    getSingleStudent
}