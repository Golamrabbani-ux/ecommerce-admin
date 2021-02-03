import { toast } from "react-toastify";
import axiosInstance from "../../helper/axios"
import { signup_request, signup_requst_failed, signup_requst_success } from "../type"



export const authSignup = (user) => {
    return async (dispatch) => {
        try {
            dispatch({
               type: signup_request, 
            })
            const res = await axiosInstance.post('/admin/signup', user)
            if(res.status===201){
                toast.success(res.data.message || "Create Successfully...!", {position: toast.POSITION.BOTTOM_RIGHT})
                dispatch({
                    type: signup_requst_success,
                    payload: res.data.message
                })
            }
            
        } catch (error) {
            toast.warn(error.message || "Request Failed", {position: toast.POSITION.BOTTOM_RIGHT})
            dispatch({
                type: signup_requst_failed,
                payload: error.message
            })
        }
    }
}