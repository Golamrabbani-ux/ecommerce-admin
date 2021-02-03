import { signup_request, signup_requst_failed, signup_requst_success  } from "../type";

const initState = {
    error: null,
    message: '',
    loading: false
}

export const signupReducer = (state = initState, action) => {
    switch (action.type) {
        case signup_request :
            state = {
                ...state,
                loading: true
            }
            return state;
        case signup_requst_success :
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            return state;
        case signup_requst_failed : 
            state = {
                ...state,
                loading: false,
                message: action.payload.error
            }
            return state;
        default:
            return state;
    }
}