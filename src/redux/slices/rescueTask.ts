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
        },
        deleteOneRescueTask: (state, action)=>{
            state.rescueTaskList = state.rescueTaskList.filter((value:any)=>{
                return value.id !== action.payload.id
            })
        }
    }
})

export default rescueTaskSlice;
export const { setRescueTaskList, deleteOneRescueTask} = rescueTaskSlice.actions;