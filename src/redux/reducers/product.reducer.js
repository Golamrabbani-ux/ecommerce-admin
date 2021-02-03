import { add_product_request, add_product_request_failed, add_product_request_success } from "../type";

const initState = {
    loading: false,
    product: [],
    error: ''
};

export const productReducer = (state = initState, action) =>{
    switch (action.type) {
        case add_product_request:
            state = {
                ...state,
                loading:  true
            }
            return state;
        case add_product_request_success:
            state = {
                ...state,
                loading:false,
                product: action.payload
            }
            return state;
        case add_product_request_failed:
            state = {
                ...state,
                loading: false,
                product: [],
                error: action.payload
            }
            return state;
    
        default:
            return state;
    }
}