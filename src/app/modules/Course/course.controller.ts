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
const assignFaculties = catchAsync(async(req,res)=>{
    const {courseId}= req.params
    const {faculties}=req.body
    const result  = await courseServices.assignFacultiesIntoDB(courseId, faculties)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'assign-faculty Successfully',
        data:result
    })
})
const removeFaculties = catchAsync(async(req,res)=>{
    const {courseId}= req.params
    const {faculties}=req.body
    const result  = await courseServices.removeFacultiesIntoDB(courseId, faculties)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'remove-faculty  Successfully',
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
    updateCourse,
    assignFaculties,
    removeFaculties
}