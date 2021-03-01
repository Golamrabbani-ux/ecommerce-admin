import { add_product_request, add_product_request_failed, add_product_request_success } from "../type";

const initialData = {
    loading: false,
    pageData: [],
    error: ''
}

const pageReducer = (state = initialData, action) =>{
    switch (action.type) {
        case add_product_request:
            state = {
                ...state,
                loading: true
            }
            return state;
        case add_product_request_success: 
            state = {
                ...state,
                loading: false,
                pageData: action.payload
            }
            return state;
        case add_product_request_failed: 
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            return state;
    
        default:
            return state;
    }
}

export default pageReducer;