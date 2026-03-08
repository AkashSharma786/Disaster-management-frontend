import { createSlice } from "@reduxjs/toolkit";
import type stateOrUtSlice from "./stateOrUt";


const rescueTaskSlice = createSlice({

    name:"rescueTask",
    initialState:{
        rescueTaskList:[]
    },
    reducers:{
        setRescueTaskList: (state, action)=>{
            state.rescueTaskList = action.payload;
        }
    }
})

export default rescueTaskSlice;
export const { setRescueTaskList} = rescueTaskSlice.actions;