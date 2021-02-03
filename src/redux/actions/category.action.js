import { toast } from "react-toastify"
import axiosInstance from "../../helper/axios"
import { add_categories_request, add_categories_request_failed, add_categories_request_success, all_categories_request, all_categories_request_failed, all_categories_request_success } from "../type"

export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: all_categories_request })
            const res = await axiosInstance.get('/category/getcategories')
            if (res.status === 200) {
                dispatch({
                    type: all_categories_request_success,
                    payload: res.data.cateList
                })
            }
        } catch (error) {
            dispatch({
                type: all_categories_request_failed,
                payload: error.message
            })
        }
    }
}

export const addCategories = (categoties) =>{
    return async dispatch =>{
        try {
            dispatch({type: add_categories_request})
            const res = await axiosInstance.post('/category/create', categoties);
            if(res.status === 201){
                dispatch({
                    type: add_categories_request_success,
                    payload: res.data.category
                })
            }
        } catch (error) {
            dispatch({
                type: add_categories_request_failed,
                payload: error.message
            })
        }
    }
}

export const updateCategories = (form) =>{
    return async dispatch =>{
        try {
            const res = await axiosInstance.post('/category/update', form)
            if(res.status === 200){
                return true;
            }
        } catch (error) {
            toast.warning(error.message || "Something warning", {position: "bottom-center",})
        }
    }
}

export const deleteCategories = (ids) =>{
    return async dispatch =>{
        try {
            const res = await axiosInstance.post('/category/delete', {
                payload: {ids}
            })
            if(res.status === 201){
                return true;
            }
        } catch (error) {
            toast.warning(error.message || "Something warning", {position: "bottom-center",})
        }
    }
}