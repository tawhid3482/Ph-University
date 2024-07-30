import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";


const createCourse = catchAsync(async(req,res)=>{
    const result  = await courseServices.createCourseIntoDB(req.body)

    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'Course Created Successfully',
        data:result
    })
})
const getAllCourse = catchAsync(async(req,res)=>{
    const result  = await courseServices.getAllCourseFromDB(req.query)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Course retrieved Successfully',
        data:result
    })
})
const getSingleCourse = catchAsync(async(req,res)=>{
    const {id}= req.params
    const result  = await courseServices.getSingleCourseFromDB(id)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Course retrieved Successfully',
        data:result
    })
})
const deleteCourse = catchAsync(async(req,res)=>{
    const {id}= req.params
    const result  = await courseServices.deleteCourseFromDB(id)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Course deleted Successfully',
        data:result
    })
})
const updateCourse = catchAsync(async(req,res)=>{
    const {id}= req.params
    const result  = await courseServices.updateCourseIntoDB(id,req.body)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Course updated Successfully',
        data:result
    })
})


export const CourseController = {
    createCourse,
    getAllCourse,
    deleteCourse,
    getSingleCourse,
    updateCourse
}