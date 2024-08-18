import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";


const loginUser = catchAsync(async(req,res)=>{
    const result = await authServices.loginUserFromClientSite(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'User is logged in successfully',
        data:result
    })
})
const changePassword = catchAsync(async(req,res)=>{
    const user = req.user;
    const {...passwordData}= req.boby
    const result = await authServices.changePasswordIntoDb(user, passwordData)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Your Password is Change successfully',
        data:result
    })
})

export const AuthControllers = {
    loginUser,
    changePassword,
}