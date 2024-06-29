import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent =async (req:Request, res:Response)=>{
  try{
    const student = req.body;
    const result = await StudentServices.createStudentIntoDB(student)

    res.status(200).json({
        success: true,
        message: 'Student create successfully',
        data: result,
    })
  }catch(error){
    console.log(error)
  }

}

export const studentControllers = {
    createStudent
}