import axiosInstance from "../../helper/axios"
import { add_product_request, add_product_request_failed, add_product_request_success } from "../type"

export const addProduct = (productData) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: add_product_request})
            const res = await axiosInstance.post('/product/create', productData)
            if(res.status === 201){
                dispatch({
                    type: add_product_request_success,
                    payload: res.data
                })
            }
        } catch (error) {
            dispatch({
                type: add_product_request_failed,
                payload: error.message
            })
        }
    }
}