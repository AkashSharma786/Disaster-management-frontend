import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: []

    },
    reducers: {

        setUsers: (state, action) => {
            state.usersList = action.payload
        }

    }}
);

export default userSlice;
export const {setUsers}  = userSlice.actions;