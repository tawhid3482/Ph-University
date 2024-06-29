import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
    try {
      const { student: studentData } = req.body;
      const result = await StudentServices.createStudentIntoDB(studentData);
  
      res.status(200).json({
        success: true,
        message: 'Student is created succesfully',
        data: result,
      });
    } catch (err) {
      console.log(err);
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

export const studentControllers = {
    createStudent,
    getAllStudent
}