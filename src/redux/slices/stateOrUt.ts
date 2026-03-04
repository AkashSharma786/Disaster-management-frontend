import { createSlice } from "@reduxjs/toolkit";


const stateOrUtSlice = createSlice({
    name: 'stateOrUts',
    initialState: {
        stateOrUtList:[],

    },

    reducers: {
        setStateOrUtList: (state, action) => {
            state.stateOrUtList = action.payload;
        }
    }
});

export const { setStateOrUtList } = stateOrUtSlice.actions;
export default stateOrUtSlice;