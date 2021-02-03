import { authReducer } from "./auth.reducer";
import { combineReducers } from "redux";
import { signupReducer } from "./signup.reducer";
import { categoryReducer } from "./category.reducer";
import { productReducer } from "./product.reducer";
import { initalDataReducer } from "./initialData.reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    user: signupReducer,
    category: categoryReducer,
    product: productReducer,
    initialData: initalDataReducer
})

export default rootReducer;