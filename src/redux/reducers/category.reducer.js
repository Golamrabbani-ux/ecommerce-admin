import { add_categories_request, add_categories_request_failed, add_categories_request_success, all_categories_request, all_categories_request_failed, all_categories_request_success, update_categories_request, update_categories_request_failed, update_categories_request_success } from "../type";

const initState = {
    loading: false,
    categories: [],
    error: ''
}

export const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case all_categories_request:
            state = {
                ...state,
                loading: true
            }
            return state;
        case all_categories_request_success:
            state = {
                ...state,
                loading: false,
                categories: action.payload
            }
            return state;
        case all_categories_request_failed:
            state = {
                ...state,
                loading: false,
                error: action.payload,
                categoties: [],
            }
            return state;
        case add_categories_request:
            state = {
                ...state,
                loading: true
            }
            return state
        case add_categories_request_success:
            state = {
                ...state,
                loading: false,
                categories: { ...state.categories, categories: action.payload }
            }
            return state;
        case add_categories_request_failed:
            state = {
                ...state,
                loading: false
            }
            return state;
        case update_categories_request:
            state = {
                ...state,
                loading: true
            }
            return state;
        case update_categories_request_success:
            state = {
                ...state,
                loading: false
            }
            return state;
        case update_categories_request_failed:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            return state;
        default:
            return state;;
    }
}