import axiosInstance from "../../helper/axios";
import { login_request, login_request_failed, login_request_success, signout_request} from "../type";

export const authLogin = (auth) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: login_request,
                payload: auth
            })
            const res = await axiosInstance.post('/admin/signin', auth)
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                dispatch({
                    type: login_request_success,
                    payload: res.data
                })
            }
        } catch (error) {
            dispatch({
                type: login_request_failed,
                payload: error.message
            })
        }
    }
}

export const authSignout = () =>{
    return async(dispatch) =>{
        localStorage.clear()
        dispatch({
            type: signout_request,
        })
        
    }
}

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token) {
            dispatch({
                type: login_request_success,
                payload: { token, user }
            })
        }
    }
}