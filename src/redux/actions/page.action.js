import axiosInstance from "../../helper/axios";
import { add_page_request, add_page_request_failed, add_page_request_success } from "../type";

export const createPage = (form) =>{
    return async dispatch =>{
        try {
            dispatch({type: add_page_request})
            const res = await axiosInstance.post('/page', form);
            if(res.status === 201){
                dispatch({
                    type: add_page_request_success,
                    payload: res.data.page
                })
            }  
        } catch (error) {
            dispatch({
                type: add_page_request_failed,
                payload: error.message
            })
        }
    }
}