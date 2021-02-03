import { get_initialData_request, get_initialData_request_failed, get_initialData_request_success } from "../type";

const initialdata = {
    loading: false,
    products: [],
    categories: [],
    error: ''
}

export const initalDataReducer = (state = initialdata, action) =>{
    switch (action.type) {
        case get_initialData_request:
            state = {
                ...state,
                loading: true
            }
            return state;
        case get_initialData_request_success:
            state = {
                ...state,
                loading: false,
                products: action.payload.products,
                categories: action.payload.categories
            }
            return state;
        case get_initialData_request_failed:
            state = {
                ...state,
                loading: false,
                products: [],
                categories: [],
                error: action.payload
            }
            return state;
        default:
            return state;
    }
}