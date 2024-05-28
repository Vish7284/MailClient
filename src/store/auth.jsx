import { createSlice } from "@reduxjs/toolkit";


const InitialState = {isLogin : false};

const authSlice  = createSlice({
    name:"auth",
    initialState :InitialState,
    reducers:{
        logIn(state ,action){
            state.isLogin = true
        }

    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;