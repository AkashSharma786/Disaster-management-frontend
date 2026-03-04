import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userInfo: null,
        isAuthenticated: false,

    },


    reducers: {
        setUserInfo: (state, action) => {
            if(action.payload == null) {
                state.userInfo = null;
                state.isAuthenticated = false;
               
            }
            else{
                 state.userInfo = action.payload;
            state.isAuthenticated = true;
            }
           
        }
        

    }
});

export const { setUserInfo } = authSlice.actions;
export default authSlice;