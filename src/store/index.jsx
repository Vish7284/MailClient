import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth.jsx"
import MailReducer from "./mail.jsx"
const store = configureStore({
    reducer:{
        auth :AuthReducer,
        mails:MailReducer,
    }
})

export default store;