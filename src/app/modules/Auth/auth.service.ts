import { userModel } from "../users/user.model";
import { TLoginUser } from "./auth.interface";


const loginUserFromClientSite = async(payload:TLoginUser)=>{
    console.log(payload)
    // const result = await userModel
}

export const authServices = {
    loginUserFromClientSite,
}