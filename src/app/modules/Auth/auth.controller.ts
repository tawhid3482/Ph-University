import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUserFromClientSite(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await authServices.changePasswordIntoDb(
    req.user,
    passwordData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your Password is Change successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
    const {refreshToken}= req.cookies
    const result = await authServices.refreshTokenFrom(refreshToken);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token is retrieved successfully',
      data: result
    });
  });

  const forgetPassword = catchAsync(async(req,res)=>{
    const {id:userId} = req.body
    const result = await authServices.forgetPasswordIntoDB(userId)
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Reset link is generated successfully',
      data:result
    })
  })
  


export const AuthControllers = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword
};
