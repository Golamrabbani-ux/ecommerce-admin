import { login_request, login_request_failed, login_request_success, signout_request } from "../type";

const initState = {
    authenticate: false,
    authenticating: false,
    error: '',
    token: '',
    user: {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        fullName: '',
        role: '',
    },
    loading: false,
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case login_request:
            state = {
                ...state,
                authenticating: true
            }
            return state;
        case login_request_success:
            state = {
                ...state,
                authenticate: true,
                authenticating: true,
                token: action.payload.token,
                user: action.payload.user
            }
            return state;
        case login_request_failed:
            state = {
                ...state,
                authenticate: false,
                authenticating: false,
                token: '',
                user: '',
                error: action.payload
            }
            return state;
        case signout_request:
            state = {
                ...initState
            }
            return state;
        default:
            return state;
    }
}