import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        isAuthenticated: false,

    },


    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            state.isAuthenticated = true;
        }

    }
});

export const { setUserInfo } = userSlice.actions;
export default userSlice;