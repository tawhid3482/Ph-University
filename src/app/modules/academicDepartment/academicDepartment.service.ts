import { TAcademicDepartment } from "./academicDepartment.interface"
import { academicDepartmentModel } from "./academicDepartment.model"

const createAcademicDepartmentIntoDB = async(payload:TAcademicDepartment)=>{
    const result = await academicDepartmentModel.create(payload)
    return result
}
const getAllAcademicDepartmentFromDB = async()=>{
    const result = await academicDepartmentModel.find()
    return result
}
const getSingleAcademicDepartmentFromDB = async(id:string)=>{
    const result = await academicDepartmentModel.findById(id)
    return result
}

export const AcademicDepartmentServices ={
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB
}