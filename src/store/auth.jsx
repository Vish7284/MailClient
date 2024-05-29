import { createSlice } from "@reduxjs/toolkit";


const InitialState = {isLogin : false,token:"",userId : null};

const authSlice  = createSlice({
    name:"auth",
    initialState :InitialState,
    reducers:{
        logIn(state ,action){
            state.isLogin = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            console.log(state.userId , state.token);
        },
        logOut(state){
            state.isLogin = false;
            state.token = "";
            state.userId = null;
        }

    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;