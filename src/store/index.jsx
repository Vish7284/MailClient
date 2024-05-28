import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth.jsx"

const store = configureStore({
    reducer:{
        auth :AuthReducer
    }
})

export default store;