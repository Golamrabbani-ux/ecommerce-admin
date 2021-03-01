import { add_home_page_banner_failed, add_home_page_banner_request, add_home_page_banner_success, get_home_page_banner_failed, get_home_page_banner_request, get_home_page_banner_success } from "../type";

const initalState = {
    loading: false,
    banner: [],
    error: ""
}

const bannerReducer = (state = initalState, action) => {
    switch (action.type) {
        case add_home_page_banner_request:
            state = {
                ...state,
                loading: true,
            }
            return state
        case add_home_page_banner_success:
            state = {
                ...state,
                loading: false,
                banner: action.payload
            }
            return state
        case add_home_page_banner_failed:
            state = {
                ...state,
                loading: false,
                banner: [],
                error: action.payload
            }
            return state
        case get_home_page_banner_request:
            state = {
                ...state,
                loading: true,
            }
            return state
        case get_home_page_banner_success:
            state = {
                ...state,
                loading: false,
                banner: action.payload
            }
            return state
        case get_home_page_banner_failed:
            state = {
                ...state,
                loading: false,
                banner: [],
                error: action.payload
            }
            return state
        default:
            return state;
    }
}

export default bannerReducer;