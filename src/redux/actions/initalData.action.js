import axiosInstance from "../../helper/axios";
import { get_initialData_request, get_initialData_request_failed, get_initialData_request_success } from "../type";

export const getInitialData =() =>{
    return async (dispatch) =>{
        try {
            dispatch({type: get_initialData_request})
            const res = await axiosInstance.post('/initialdata')
            if(res.status === 200){
                dispatch({
                    type: get_initialData_request_success,
                    payload: res.data
                })
            }
        } catch (error) {
            dispatch({
                type: get_initialData_request_failed,
                payload: error.message
            })
        }
    }
}