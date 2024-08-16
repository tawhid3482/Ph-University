import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";


const loginUser = catchAsync(async(req,res)=>{
    const result = await authServices.loginUserFromClientSite
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'User is logged in successfully',
        data:result
    })
})

export const AuthControllers = {
    loginUser
}